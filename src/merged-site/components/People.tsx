"use client";

import Image from "next/image";
import { useState } from "react";

const PEOPLE = [
  {
    id: "1",
    img: "/img/portrait-1.jpg",
    study: "Study no. 01",
    pos: { left: "1%", top: "3%", width: "31%", rotate: "-1.6deg", z: 2 },
  },
  {
    id: "2",
    img: "/img/portrait-2.jpg",
    study: "Study no. 02",
    pos: { left: "26%", top: "17%", width: "27%", rotate: "1.2deg", z: 3 },
  },
  {
    id: "3",
    img: "/img/portrait-3.jpg",
    study: "Study no. 03",
    pos: { left: "49%", top: "1%", width: "30%", rotate: "-0.9deg", z: 2 },
  },
  {
    id: "4",
    img: "/img/portrait-4.jpg",
    study: "Study no. 04",
    pos: { left: "74%", top: "19%", width: "25%", rotate: "2deg", z: 4 },
  },
];

/**
 * PEOPLE — portrait studies arranged as one composition with depth.
 * Hover / focus / tap brings one person forward; the others step back.
 * No invented names or credentials: everything unpublished reads TBC.
 */
export default function People() {
  const [active, setActive] = useState<string | null>(null);
  const person = PEOPLE.find((p) => p.id === active) ?? null;

  return (
    <section id="people" className="section people" aria-labelledby="people-title">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="eyebrow">People</p>
            <h2 className="section-title" id="people-title">
              The room you will <em>actually</em> work in.
            </h2>
          </div>
          <p className="lede">
            Portraits appear as watercolour studies until photographs and biographies are
            published. Nothing on this page is invented — where we have no data, we say TBC.
          </p>
        </header>

        <div
          className="people-stage"
          data-active={active ?? "0"}
          onMouseLeave={() => setActive(null)}
        >
          {PEOPLE.map((p) => (
            <button
              key={p.id}
              type="button"
              className="person"
              data-id={p.id}
              data-front={active === p.id}
              style={
                {
                  left: p.pos.left,
                  top: p.pos.top,
                  width: p.pos.width,
                  zIndex: p.pos.z,
                  rotate: p.pos.rotate,
                } as React.CSSProperties
              }
              onMouseEnter={() => setActive(p.id)}
              onFocus={() => setActive(p.id)}
              onClick={() => setActive(active === p.id ? null : p.id)}
              aria-label={`Portrait ${p.study} — name and role to be confirmed`}
              aria-describedby="person-panel"
            >
              <span className="mat">
                <span className="imgwrap">
                  <Image
                    src={p.img}
                    alt={`Watercolour portrait ${p.study} — identity TBC`}
                    width={900}
                    height={1125}
                    sizes="(max-width: 860px) 46vw, 28vw"
                    quality={82}
                  />
                </span>
                <span className="who">
                  <span>{p.study}</span>
                  <span>TBC</span>
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="person-panel" id="person-panel" aria-live="polite">
          {person ? (
            <>
              <p className="hint">
                {person.study} — the part of the route this person carries will be published with
                the full team page.
              </p>
              <dl className="panel-rows">
                <div className="panel-row">
                  <dt>Name</dt>
                  <dd className="tbc">TBC</dd>
                </div>
                <div className="panel-row">
                  <dt>Role</dt>
                  <dd className="tbc">TBC</dd>
                </div>
                <div className="panel-row">
                  <dt>Expertise</dt>
                  <dd className="tbc">TBC</dd>
                </div>
                <div className="panel-row">
                  <dt>Biography</dt>
                  <dd className="tbc">In preparation</dd>
                </div>
              </dl>
            </>
          ) : (
            <>
              <p className="hint">
                Move across the portrait studies — each carries a part of the route. Names, roles
                and biographies follow with the full team page.
              </p>
              <dl className="panel-rows">
                <div className="panel-row">
                  <dt>Team</dt>
                  <dd>Consultants & tutors, Oxford</dd>
                </div>
                <div className="panel-row">
                  <dt>Working language</dt>
                  <dd>English</dd>
                </div>
              </dl>
            </>
          )}
        </div>
        <p className="people-fact">
          Consultants &amp; tutors — English-speaking, Oxford-based, independent.
        </p>
      </div>
    </section>
  );
}
