import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Certificates from "@/components/Certificates";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import TibebDivider from "@/components/TibebDivider";
import { getFeaturedGithubProjects } from "@/lib/github";
import { supabase } from "@/lib/supabase";
import { getSiteContent } from "@/lib/content";

export const revalidate = 60;

async function submitContact(formData: FormData) {
  "use server";
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, message: "Please complete every field." };
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, email, message });

  if (error) {
    return { ok: false, message: "Could not send your message. Please try again." };
  }

  return { ok: true, message: "Message sent successfully." };
}

export default async function HomePage() {
  const [projects, content] = await Promise.all([getFeaturedGithubProjects(), getSiteContent()]);

  return (
    <main>
      <Navbar />
      <Hero />
      <TibebDivider />
      <About content={content.about} />
      <TibebDivider />
      <Projects projects={projects} />
      <TibebDivider />
      <Experience items={content.experience} />
      <Certificates items={content.certificates} />
      <TibebDivider />
      <Contact submitContact={submitContact} />

      <Footer />
    </main>
  );
}
