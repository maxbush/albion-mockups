import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { validateEnquiry } from "@/lib/enquiry";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, errors: { form: "Invalid request." } }, { status: 400 });
  }

  const { data, errors, spam } = validateEnquiry(body);

  // Pretend success for bots so they don't retry.
  if (spam) return Response.json({ ok: true }, { status: 201 });
  if (!data) return Response.json({ ok: false, errors }, { status: 400 });

  try {
    const [row] = await db
      .insert(enquiries)
      .values({
        kind: data.kind,
        audience: data.audience || null,
        age: data.age || null,
        stage: data.stage || null,
        parentName: data.parentName,
        channel: data.channel,
        phone: data.phone || null,
        email: data.email || null,
        message: data.message || null,
        consent: data.consent,
      })
      .returning({ id: enquiries.id });

    return Response.json({ ok: true, id: row.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save enquiry", error);
    return Response.json(
      { ok: false, errors: { form: "Service temporarily unavailable. Please try later." } },
      { status: 500 },
    );
  }
}
