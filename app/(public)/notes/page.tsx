import React from 'react'
import Link from 'next/link'
import { EMOJI_FOR_STATUS, Note, getNotes } from './utils'
import Prose from '../../components/prose'
import Tag from 'react-feather/dist/icons/tag'
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Notes',
  description:
    "My digital garden, my collection of notes and explorations that I'm actively tending to.",
  openGraph: {
    title: 'Notes',
    description:
      "My digital garden, my collection of notes and explorations that I'm actively tending to.",
    images: ['https://mxstbr.com/static/images/digital-garden.jpeg'],
  },
  twitter: {
    title: 'Notes',
    description:
      "My digital garden, my collection of notes and explorations that I'm actively tending to.",
    images: ['https://mxstbr.com/static/images/digital-garden.jpeg'],
  },
}

export default async function WritingPage() {
  const notes = await getNotes()

  const allTags = notes.flatMap((note) => note.metadata.tags || [])
  const tags = [
    // @ts-ignore
    ...new Map(allTags.map((tag) => [tag.slug, tag])).values(),
  ].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="space-y-16 lg:space-y-20">
      <Prose>
        <h1>Notes</h1>
        <p>
          This is my <mark><Link href="https://maggieappleton.com/garden-history">digital garden</Link></mark> where I nurture emerging thoughts. I share these with the wider web, originally in an unpolished state, with the aim to nurture them into a coherent exploration of ideas in the software space.
        </p>
        <p>
          When seedlings get planted here it means the ideas being discussed sparked genuine curiosity in me. I will tend to the garden with the intention of seeing my favourite thoughts blossom into fully-realised insights. My goal for now is to follow Feynmann's idea that <mark><Link href="https://fs.blog/feynman-technique/">teaching something is the best way to truly understand it. </Link></mark>
        </p>
        <p>
          So I write about technical topics in easy to consume content. It's my way of learning while helping others learn too.
        </p>
        <p>
          <em>
            <Link href="/notes/digital-garden#denoting-the-maturity-of-my-explorations">
              Legend
            </Link>
            : 🌱 = Seedling, 🌿 = Budding, 🌲 = Evergreen, 🔗 = Link
          </em>
        </p>
      </Prose>

      <div className="lg:px-12 lg:w-screen lg:relative lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw] lg:overflow-hidden">
        <div className="lg:max-w-screen-xl mx-auto columns-xs gap-8 space-y-8">
          {notes
            .sort(
              (a, b) =>
                new Date(
                  b.metadata.updatedAt || b.metadata.publishedAt,
                ).getTime() -
                new Date(
                  a.metadata.updatedAt || a.metadata.publishedAt,
                ).getTime(),
            )
            .map((note) => (
              <NoteCard key={note.slug} note={note} />
            ))}
        </div>
      </div>
    </div>
  )
}

function NoteCard({ note }: { note: Note }) {
  return (
    <div className="flex gap-x-4 border rounded-md p-4 break-inside-avoid">
      <div className="text-2xl">
        {EMOJI_FOR_STATUS[note.metadata.status]}
      </div>
      <div className="flex flex-col gap-2">
        <Link
          href={`/notes/${note.slug}`}
          className="font-medium text-lg hover:underline"
        >
          {note.metadata.title}
        </Link>
        <div className="flex flex-wrap gap-2 text-slate-500">
          {note.metadata.tags?.map((tag) => (
            <Link
              key={tag.slug}
              href={`/notes/topics/${tag.slug}`}
              className="text-sm flex flex-row gap-1 items-center no-underline hover:underline"
            >
              <Tag size="0.8em" className="opacity-75 text-slate-500" />
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
