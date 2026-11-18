import ChatDemo from "@/components/ChatDemo";
import { site } from "@/lib/site";

const features: { group: string; rows: [string, string][] }[] = [
  { group: "Remember", rows: [
    ["addtask Submit lab report fri 5pm urgent", "Saves it and reminds you at the time, with an early heads-up if it is urgent."],
    ["remind me to read chapter 4 in 2 hours", "Plain sentences work. It shows the time it understood, so mistakes are visible."],
    ["tasks · done 3 · snooze 2h", "List, finish and delay. Repeat with “every monday”."],
  ]},
  { group: "Plan", rows: [
    ["addclass Physics mon wed 10am-12pm @ LT2", "Weekly class reminders and a timetable view."],
    ["addexam Chemistry 20 nov 9am", "Countdown reminders as the date gets close."],
    ["today", "Classes, tasks and exams for the day. A briefing arrives each morning."],
  ]},
  { group: "Revise", rows: [
    ["addcard Powerhouse of the cell? | Mitochondrion", "Flashcards on a spaced schedule, so hard ones come back sooner."],
    ["quiz", "You answer first, then it marks you."],
    ["focus 45 Calculus · studystats", "A study timer and a weekly log of how long you studied."],
  ]},
  { group: "Learn", rows: [
    ["ask Why is the sky blue?", "An AI tutor: concept first, then an analogy, a worked example and common mistakes."],
    ["newchat", "Pick a topic and learn. Say “I'm done” and it asks questions and marks your answers."],
    ["remember I learn best at night", "It adapts to you over time."],
  ]},
  { group: "Find", rows: [
    ["google causes of inflation", "A short answer, a picture and links."],
    ["image of the water cycle", "Diagrams on demand. Free sources work with no key."],
  ]},
  { group: "Groups", rows: [
    ["tag it, reply to it, or start with “mypai”", "It answers you in a class group, and sends private things (tasks, timetable) to your DM."],
    ["sticker · steal · toimg", "Turn pictures into stickers."],
  ]},
];

const steps = [
  ["Download the files", "Open the GitHub page and choose Code > Download ZIP."],
  ["Put it on a host that stays on", "The bot must run all day to send reminders. The free options are in the next section."],
  ["Link a spare WhatsApp line", "The bot shows a pairing code. On the spare line, open WhatsApp > Linked devices > Link with phone number and enter it."],
  ["Message the bot “menu”", "Chat with it from your main WhatsApp. Add your first task and it starts reminding you."],
];

const perks: [string, string, string][] = [
  ["GitHub Student Developer Pack", "100+ tools and credits. Most other student perks start here.", "Needs verification: school email, student ID or proof of enrolment."],
  ["DigitalOcean (via the Pack)", "About $200 in credits.", "Credits expire."],
  ["Azure for Students", "About $100 in credits, no card needed.", "Usually asks for a school email."],
  ["AWS Free Tier", "12 months of a small EC2 server.", "Needs a card at sign-up. Set billing alerts first."],
  ["AWS Educate", "Credits vary by school.", "Only if your school is recognised."],
  ["Oracle Cloud Always Free", "Small always-on VMs.", "No student status needed, and it does not expire."],
  ["Gemini and Groq keys", "Free tiers for the AI tutor.", "Rate limits apply."],
];

export default function Home() {
  return (
    <>
      <header className="top">
        <a className="brand" href="#top">mypai</a>
        <nav aria-label="Sections">
          <a href="#features">What it does</a>
          <a href="#start">Get started</a>
          <a href="#free">Run it free</a>
          <a href="#devs">Developers</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <h1>Your study partner lives in WhatsApp.</h1>
            <p className="lede">
              mypai keeps your tasks, reminds you before classes and exams, quizzes you with flashcards and explains hard topics.
              There is no new app to open. You just message it.
            </p>
            <div className="actions">
              <a className="btn primary" href={site.downloadUrl}>Download the bot</a>
              <a className="btn" href="#features">See what it does</a>
            </div>
            <p className="margin-note">students can run it for free</p>
          </div>
          <ChatDemo />
        </section>

        <section id="features" className="block">
          <h2>What you can say to it</h2>
          <p className="sub">No prefix and no menus to learn. Type like you would to a friend. Everything below works today.</p>
          <div className="features">
            {features.map((f) => (
              <div key={f.group} className="group">
                <h3>{f.group}</h3>
                <dl>
                  {f.rows.map(([cmd, what]) => (
                    <div key={cmd} className="row">
                      <dt><code>{cmd}</code></dt>
                      <dd>{what}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section id="start" className="block">
          <h2>Get started</h2>
          <p className="sub">The bot runs on your own host, so your data stays with you.</p>
          <ol className="steps">
            {steps.map(([t, d]) => (
              <li key={t}><strong>{t}</strong><span>{d}</span></li>
            ))}
          </ol>
          <aside className="callout" aria-label="Use a spare line">
            <strong>Use a spare line, not your main WhatsApp number.</strong>
            <span>
              The bot uses an unofficial connection, and WhatsApp can restrict numbers that use one. A spare SIM keeps your main account safe.
              Link the bot to the spare line, then set your main number as the owner in the settings file (<code>OWNER_NUMBER</code>). You chat with it from your main WhatsApp, and it obeys only you.
            </span>
          </aside>
          <p className="actions">
            <a className="btn primary" href={site.downloadUrl}>Download from GitHub</a>
            {site.tutorialUrl && <a className="btn" href={site.tutorialUrl}>Watch the setup tutorial</a>}
          </p>
        </section>

        <section id="free" className="block">
          <h2>Run it for free</h2>
          <p className="sub">
            Students can get hosting credits and free AI keys that cover a bot like this. Checked {site.researchedOn}. Offers change, so open the live page before you rely on a figure.
          </p>
          <div className="table-wrap">
            <table>
              <thead><tr><th scope="col">Offer</th><th scope="col">What you get</th><th scope="col">The catch</th></tr></thead>
              <tbody>
                {perks.map(([a, b, c]) => (
                  <tr key={a}><th scope="row">{a}</th><td>{b}</td><td>{c}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note">
            <a href={site.studentPackUrl}>Start with the GitHub Student Developer Pack</a>. Free credits end, so set a billing alert before you start.
            This website can live on Vercel or Netlify, but the bot cannot: it has to stay on all day, so it needs a small server, a bot panel host or a spare machine.
          </p>
        </section>

        <section id="devs" className="block">
          <h2>For developers</h2>
          <p className="sub">Node 20+, Baileys for WhatsApp, plain JSON storage, 111 tests. Every command is one file.</p>
          <pre className="code"><code>{`// features/hello.js
const { cmd } = require('../lib');

cmd({ pattern: 'hello', desc: 'Say hello', category: 'else' },
  async (Void, citel, text) => citel.reply('Hi! ' + text));`}</code></pre>
          <p className="note">Licensed GPL-3.0. {site.sourceUrl && <a href={site.sourceUrl}>Source code</a>}</p>
        </section>
      </main>

      <footer>
        <p>mypai is not affiliated with or endorsed by WhatsApp. It uses an unofficial library, so run it on a spare line and keep your main number out of it.</p>
        <p><a href={site.downloadUrl}>Download</a>{site.sourceUrl && <> · <a href={site.sourceUrl}>Source</a></>}</p>
      </footer>
    </>
  );
}
