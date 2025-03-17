import Layout from 'components/ui/Layout'
import { FC } from 'react'

const Info: FC = () => {
  return (
    <Layout>
      <div className="container py-5">
        <h1 className="text-center mb-4 text-primary">Copyright Information</h1>

        <section className="mb-5">
          <h2 className="text-secondary">What is Copyright?</h2>
          <p>
            Copyright is a legal framework that provides creators with exclusive
            rights to their original works, including art, music, writing, and
            more. It ensures that creators can control how their work is used,
            shared, and reproduced, while also providing guidelines for fair use
            and licensing.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-secondary">Why is Copyright Important?</h2>
          <ul>
            <li>It protects the intellectual property of creators.</li>
            <li>
              It encourages creativity and innovation by ensuring fair
              recognition and compensation.
            </li>
            <li>
              It provides clear rules for the use of creative works in projects,
              avoiding legal issues.
            </li>
          </ul>
        </section>

        <section className="mb-5">
          <h2 className="text-secondary">Types of Copyright Licenses</h2>
          <p>Below are details about common types of copyright licenses:</p>
          <ul>
            <li>
              <strong>CC BY:</strong> Allows others to distribute, remix, adapt,
              and build upon the work, even commercially, as long as credit is
              given to the creator.
            </li>
            <li>
              <strong>CC BY-SA:</strong> Similar to CC BY, but adaptations must
              be licensed under identical terms.
            </li>
            <li>
              <strong>CC BY-NC:</strong> Others can remix, adapt, and build upon
              the work non-commercially. Attribution is required, but derivative
              works do not have to be licensed under the same terms.
            </li>
            <li>
              <strong>CC BY-ND:</strong> Allows redistribution, commercial and
              non-commercial, as long as the work remains unchanged and credit
              is given to the creator.
            </li>
            <li>
              <strong>GPL:</strong> The GNU General Public License ensures
              software can be freely used, modified, and shared with the same
              open-source license.
            </li>
            <li>
              <strong>Copyright:</strong> A traditional license where all rights
              are reserved to the creator, requiring explicit permission for
              use.
            </li>
            <li>
              <strong>Public Domain:</strong> Works that are free to use without
              restrictions, often due to copyright expiration or voluntary
              release by the creator.
            </li>
          </ul>
        </section>

        <section className="mb-5">
          <h2 className="text-secondary">How to Respect Copyright?</h2>
          <ol>
            <li>
              Always check the licensing information before using any work.
            </li>
            <li>Provide proper attribution when required by the license.</li>
            <li>When in doubt, seek permission from the copyright holder.</li>
          </ol>
        </section>

        <section className="mb-5">
          <h2 className="text-secondary">Resources</h2>
          <p>
            Here are some resources to learn more about copyright and licensing:
          </p>
          <ul>
            <li>
              <a
                href="https://creativecommons.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Creative Commons
              </a>
            </li>
            <li>
              <a
                href="https://www.gnu.org/licenses/gpl-3.0.en.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                GNU General Public License
              </a>
            </li>
            <li>
              <a
                href="https://www.wipo.int/copyright/en/"
                target="_blank"
                rel="noopener noreferrer"
              >
                World Intellectual Property Organization (WIPO)
              </a>
            </li>
            <li>
              <a
                href="https://fairuse.stanford.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stanford Copyright and Fair Use Center
              </a>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export default Info
