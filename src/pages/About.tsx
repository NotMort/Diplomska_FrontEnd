import Layout from 'components/ui/Layout'
import { FC } from 'react'

const About: FC = () => {
  return (
    <Layout>
      <div className="container py-5">
        <h1 className="text-center text-primary mb-4">About This Project</h1>

        <section className="mb-5">
          <p>
            Welcome to the <strong>ArtisticWorks Platform</strong>, a project
            developed by Martin Gruber as part of the final thesis for the
            Computer and Information Technology program at FERI, under the
            mentorship of Peter Kokol.
          </p>
          <p>
            This platform aims to bridge the gap between digital artists and
            developers by providing a centralized space to publish and discover
            artistic works, such as images, sounds, and 3D models, with detailed
            information about copyright and licensing. By addressing challenges
            around understanding and adhering to copyright laws, this project
            aspires to simplify creative collaboration while respecting
            intellectual property rights.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-secondary">Key Features</h2>
          <ul>
            <li>
              Enable artists to upload their works with detailed copyright
              information.
            </li>
            <li>
              Allow users to filter and search for works based on copyright
              types.
            </li>
            <li>
              Analyze the impact of this platform on simplifying the use of
              artistic works in various projects.
            </li>
          </ul>
        </section>

        <section className="mb-5">
          <h2 className="text-secondary">Technology Stack</h2>
          <p>
            This platform is built using modern web development technologies,
            ensuring a seamless and responsive user experience. The primary
            technologies used include:
          </p>
          <ul>
            <li>
              <strong>Backend:</strong> JavaScript, TypeScript, Node.js,
              Express.js, Nest.js, PostgreSQL
            </li>
            <li>
              <strong>Frontend:</strong> React.js, TypeScript, Bootstrap, CSS
            </li>
            <li>
              <strong>Tools:</strong> Postman, Visual Studio Code
            </li>
          </ul>
        </section>

        <section className="mb-5">
          <h2 className="text-secondary">Vision</h2>
          <p>
            The ArtisticWorks Platform aspires to be a go-to resource for
            creatives worldwide, fostering innovation, collaboration, and mutual
            respect for intellectual property. By making copyright information
            accessible and straightforward, the platform empowers artists and
            developers to focus on creating and building impactful projects.
          </p>
        </section>
      </div>
    </Layout>
  )
}
export default About
