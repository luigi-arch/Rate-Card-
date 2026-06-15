import { CONTACT } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-center">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">
            Malta’s largest youth news platform. We build stories that make an
            impact.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm md:items-end">
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-muted transition-colors hover:text-fg"
          >
            {CONTACT.email}
          </a>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-fg"
          >
            @sidestreetmalta
          </a>
          <a
            href={`https://${CONTACT.site}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold hover:underline"
          >
            {CONTACT.site}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SideStreet. All rights reserved.</p>
          <p>Stories that matter. Partnerships that make an impact.</p>
        </div>
      </div>
    </footer>
  );
}
