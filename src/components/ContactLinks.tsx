import { site } from "../data/site";
import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon } from "./icons";

interface Props {
  className?: string; // estilo da lista (direção, espaçamento)
  linkClassName?: string; // estilo de cada link (cor, hover)
  size?: number;
  withEmail?: boolean; // false: omite o ícone de email
  showLabels?: boolean; // true: mostra o nome ao lado do ícone
}

export default function ContactLinks({
  className = "",
  linkClassName = "",
  size = 22,
  withEmail = true,
  showLabels = false,
}: Props) {
  const items = [
    {
      key: "github",
      label: "GitHub",
      href: site.contacts.github,
      Icon: GithubIcon,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: site.contacts.linkedin,
      Icon: LinkedinIcon,
    },
    {
      key: "instagram",
      label: "Instagram",
      href: site.contacts.instagram,
      Icon: InstagramIcon,
    },
    ...(withEmail
      ? [
          {
            key: "email",
            label: "Email",
            href: `mailto:${site.contacts.email}`,
            Icon: MailIcon,
          },
        ]
      : []),
  ];

  return (
    <ul className={className}>
      {items.map(({ key, label, href, Icon }) => {
        const external = !href.startsWith("mailto:");
        return (
          <li key={key}>
            <a
              href={href}
              aria-label={showLabels ? undefined : label}
              title={label}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className={`flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${linkClassName}`}
            >
              <Icon size={size} />
              {showLabels && <span>{label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
