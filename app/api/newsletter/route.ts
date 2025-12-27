import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        // Validate email
        if (!email || typeof email !== "string" || !email.includes("@")) {
            return NextResponse.json(
                { error: "Please provide a valid email address" },
                { status: 400 }
            );
        }

        // Check if Resend API key is configured
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.warn("RESEND_API_KEY not configured - skipping email");
            // For development, just return success
            return NextResponse.json(
                { message: "Successfully subscribed! (dev mode)" },
                { status: 200 }
            );
        }

        const resend = new Resend(apiKey);

        // Add contact to Resend audience
        const audienceId = process.env.RESEND_AUDIENCE_ID;

        if (audienceId) {
            // Add to audience for proper newsletter management
            await resend.contacts.create({
                email,
                audienceId,
                unsubscribed: false,
            });
        }

        // Send welcome email
        // Note: Use "onboarding@resend.dev" for free tier, or your verified domain
        const fromEmail = process.env.RESEND_FROM_EMAIL || "Gajanan <onboarding@resend.dev>";

        await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: "Welcome to my newsletter! 🎉",
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #8b5cf6; margin-bottom: 20px;">Welcome aboard! 🚀</h1>
                    <p style="color: #374151; font-size: 16px; line-height: 1.6;">Thank you for subscribing to my newsletter.</p>
                    <p style="color: #374151; font-size: 16px; line-height: 1.6;">You'll receive updates about:</p>
                    <ul style="color: #374151; font-size: 16px; line-height: 1.8;">
                        <li>New blog posts</li>
                        <li>Projects and side hustles</li>
                        <li>Tech insights and learnings</li>
                    </ul>
                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-top: 20px;">Best,<br/><strong>Gajanan Rathod</strong></p>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
                    <p style="color: #9ca3af; font-size: 12px;">You received this because you subscribed at gajanansr.vercel.app</p>
                </div>
            `,
        });

        return NextResponse.json(
            { message: "Successfully subscribed!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return NextResponse.json(
            { error: "Failed to subscribe. Please try again." },
            { status: 500 }
        );
    }
}

