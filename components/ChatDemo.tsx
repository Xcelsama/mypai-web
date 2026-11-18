"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { id: number; from: "me" | "bot"; text: string };
type Scene = { chip: string; user: string; bot: string[] };

const SCENES: Record<string, Scene> = {
  menu: {
    chip: "menu",
    user: "menu",
    bot: [
      "Hey *Ada* 👋 You have *3 pending tasks* — *1 urgent*.\n📅 Next: _Physics lab report, today 5:00 PM_",
      "```tasks   addtask   quiz\ntimetable   focus   newchat\nask   google   sticker```\n_Say_ *menu tasks* _for details._",
    ],
  },
  addtask: {
    chip: "addtask",
    user: "addtask Submit lab report fri 5pm urgent",
    bot: ["✅ *Task saved*\n📝 Submit lab report\n📅 Fri 20 Nov, 5:00 PM\n⚡ urgent — I'll ping you 30 min before."],
  },
  tasks: {
    chip: "tasks",
    user: "tasks",
    bot: [
      "📌 *Your tasks* — 3 pending\n```1 ⚡ Submit lab report  Fri 5pm\n2    Read chapter 4     Sat 9am\n3    Revise Chemistry   daily 6pm```\n_Finish one:_ *done 2*",
    ],
  },
  quiz: {
    chip: "quiz",
    user: "quiz",
    bot: ["🃏 *Card 1 of 5* (Biology)\nWhat is the powerhouse of the cell?", "_Answer first. I'll mark it after._"],
  },
  ask: {
    chip: "ask",
    user: "ask Why is the sky blue?",
    bot: [
      "💡 *Concept first:* sunlight is every colour mixed. Air scatters short wavelengths (blue) far more than long ones (red).",
      "🔁 *Analogy:* blue light is a ping-pong ball bouncing off tiny obstacles, red slips through.\n⚠️ *Common mistake:* the sky is not blue because it reflects the sea.\n_Demo reply. The real tutor writes a fresh answer each time._",
    ],
  },
  newchat: {
    chip: "newchat",
    user: "newchat",
    bot: [
      "🎓 *Study session started.* What topic are we learning?",
      "_Learn it, ask follow-ups, then say_ *I'm done*. _I'll ask 5 questions and mark your answers._",
    ],
  },
  focus: {
    chip: "focus 25",
    user: "focus 25 Biology",
    bot: ["⏱️ *Focus: 25 min, Biology.* Phone down. I'll message you when time is up.", "🔥 3 sessions today · 2h 10m this week"],
  },
  google: {
    chip: "image of…",
    user: "image of the water cycle",
    bot: ["🖼️ *Water cycle:* evaporation, condensation, precipitation, collection.\n_The real bot also sends a picture and links._"],
  },
};

function route(input: string): Scene | null {
  const t = input.trim().toLowerCase();
  if (!t) return null;
  const rules: [RegExp, string][] = [
    [/^(menu|hi|hello|hey)/, "menu"],
    [/^(addtask|task |remind|todo)/, "addtask"],
    [/^tasks?$|^today/, "tasks"],
    [/^(quiz|cards)/, "quiz"],
    [/^(ask|tch|teach|explain)/, "ask"],
    [/^(newchat|session)/, "newchat"],
    [/^focus/, "focus"],
    [/^(google|image|img|picture|diagram)/, "google"],
  ];
  for (const [re, key] of rules) if (re.test(t)) return { ...SCENES[key], user: input.trim() };
  return {
    chip: "",
    user: input.trim(),
    bot: ["🤔 This is a demo, so I only know a few lines.\n_Try:_ *menu* · *addtask …* · *tasks* · *quiz* · *ask …* · *focus 25* · *newchat*"],
  };
}

function Rich({ text }: { text: string }) {
  const parts = text.split(/(```[\s\S]*?```|\*[^*\n]+\*|_[^_\n]+_)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("```")) return <code key={i} className="mono">{p.slice(3, -3).replace(/^\n/, "")}</code>;
        if (p.startsWith("*") && p.endsWith("*") && p.length > 2) return <strong key={i}>{p.slice(1, -1)}</strong>;
        if (p.startsWith("_") && p.endsWith("_") && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>;
        const afterCode = i > 0 && parts[i - 1].startsWith("```");
        return <span key={i}>{afterCode ? p.replace(/^\n/, "") : p}</span>;
      })}
    </>
  );
}

export default function ChatDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const run = useRef(0);
  const idRef = useRef(0);
  const box = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, reduced.current ? 0 : ms));

  async function play(scene: Scene) {
    const mine = ++run.current;
    setMsgs((m) => [...m, { id: ++idRef.current, from: "me", text: scene.user }]);
    for (const line of scene.bot) {
      setTyping(true);
      await wait(750);
      if (mine !== run.current) return;
      setTyping(false);
      setMsgs((m) => [...m, { id: ++idRef.current, from: "bot", text: line }]);
      await wait(350);
      if (mine !== run.current) return;
    }
  }

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dead = false;
    (async () => {
      await wait(900);
      if (dead) return;
      await play(SCENES.menu);
      await wait(1400);
      if (dead || run.current !== 1) return;
      await play(SCENES.addtask);
    })();
    return () => {
      dead = true;
      run.current = 99999;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: reduced.current ? "auto" : "smooth" });
  }, [msgs, typing]);

  return (
    <div className="phone" role="group" aria-label="Interactive demo of the mypai WhatsApp chat">
      <div className="phone-head">
        <span className="avatar" aria-hidden>m</span>
        <div>
          <strong>mypai</strong>
          <small>{typing ? "typing…" : "online"}</small>
        </div>
      </div>
      <div className="phone-body" ref={box} role="log" aria-live="polite">
        {msgs.map((m) => (
          <div key={m.id} className={`bubble ${m.from}`}>
            <Rich text={m.text} />
          </div>
        ))}
        {typing && (
          <div className="bubble bot dots" aria-hidden>
            <i /><i /><i />
          </div>
        )}
      </div>
      <div className="chips">
        {Object.entries(SCENES).map(([k, s]) => (
          <button key={k} type="button" onClick={() => play({ ...s })}>{s.chip}</button>
        ))}
      </div>
      <form
        className="phone-input"
        onSubmit={(e) => {
          e.preventDefault();
          const s = route(input);
          if (s) play(s);
          setInput("");
        }}
      >
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a command" aria-label="Type a command" />
        <button type="submit" aria-label="Send">➤</button>
      </form>
    </div>
  );
}
