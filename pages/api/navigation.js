// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function navigation(req, res) {
  res.status(200).json([
    {
      name: "Portfolios",
      dropdown: true,
      dropdownItems: [
        {
          name: "Portfolio Website",
          description:
            "Get a better understading of where your traffic is coming from",
          href: "https://azharzaman.com",
          imgSrc:
            "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg",
        },
        {
          name: "Simplified Amazon Clone",
          description:
            "Get a better understading of where your traffic is coming from",
          href: "https://azhar-amazonclone.ga",
          imgSrc:
            "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg",
        },
        {
          name: "Airbnb Clone",
          description:
            "Get a better understading of where your traffic is coming from",
          href: "https://azhar-airbnb-clone.netlify.app/",
          imgSrc:
            "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg",
        },
        {
          name: "Simplified Netflix Clone",
          description:
            "Get a better understading of where your traffic is coming from",
          href: "https://azhar-netflixclone.netlify.app",
          imgSrc:
            "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg",
        },
      ],
    },
    {
      name: "Upcoming Products",
      href: "#",
      dropdown: true,
      dropdownItems: [
        {
          name: "Amazon Clone 2.0",
          description:
            "Get a better understading of where your traffic is coming from",
          href: "#",
          imgSrc:
            "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg",
        },
        {
          name: "Airbnb Clone 2.0",
          description:
            "Get a better understading of where your traffic is coming from",
          href: "https://azhar-airbnb-clone.netlify.app/",
          imgSrc:
            "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg",
        },
      ],
    },
  ]);
}
