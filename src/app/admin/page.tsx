import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";

const adminSections = [
  {
    title: "Projects",
    description: "Create new projects and manage existing ones.",
    links: [
      { label: "Create Project", href: "/projects/create" },
      { label: "Manage Projects", href: "/admin/projects" },
    ],
  },
  {
    title: "Project Categories",
    description: "Create and manage categories used in the project form.",
    links: [
      { label: "Create Category", href: "/admin/project-categories/create" },
      { label: "Manage Categories", href: "/admin/project-categories" },
    ],
  },
  {
    title: "Case Studies",
    description: "Create new case studies and manage existing ones.",
    links: [
      { label: "Create Case Study", href: "/case-studies/create" },
      { label: "Manage Case Studies", href: "/admin/case-studies" },
    ],
  },
  {
    title: "Case Study Categories",
    description: "Create and manage categories used in the case study form.",
    links: [
      { label: "Create Category", href: "/admin/case-study-categories/create" },
      { label: "Manage Categories", href: "/admin/case-study-categories" },
    ],
  },
  {
    title: "Posts",
    description: "Create blog posts and manage published or draft content.",
    links: [
      { label: "Create Post", href: "/posts/create" },
      { label: "Manage Posts", href: "/admin/posts" },
    ],
  },
  {
    title: "Users",
    description: "Manage user accounts, permissions, and roles.",
    links: [
      { label: "Create User", href: "/admin/users/create" },
      { label: "Manage Users", href: "/admin/users" },
    ],
  },
];

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-black px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-100">
            Admin Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-gray-400">
            Manage projects, case studies, posts, users, and category systems
            from one place.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {adminSections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-sm shadow-gray-900"
            >
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-white">
                  {section.title}
                </h2>
                <p className="text-sm text-gray-400">{section.description}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center justify-center rounded-md border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 transition hover:border-purple-400 hover:text-white hover:bg-gray-900"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}