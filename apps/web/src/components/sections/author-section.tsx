import Author from 'components/author';
import SectionHeading from 'components/section-heading';
import { UserRound } from 'lucide-react';

const AuthorSection = () => (
  <section className="border-border border-t bg-card">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <SectionHeading icon={UserRound}>著者について</SectionHeading>
      <div className="max-w-xl rounded-xl border border-border bg-background p-6">
        <Author />
      </div>
    </div>
  </section>
);

export default AuthorSection;
