// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function navigation(req, res) {
  res.status(200).json([
    {
      name: "Portfolios",
      dropdown: true,
      dropdownItems: [
        { label: "Portfolio Website", link: "https://azharzaman.com" },
        {
          label: "Simplified Amazon Clone",
          link: "https://azhar-amazonclone.ga",
        },
        {
          label: "Airbnb Clone",
          link: "https://azhar-airbnb-clone.netlify.app/",
        },
        {
          label: "Simplified Netflix Clone",
          link: "https://azhar-netflixclone.netlify.app",
        },
      ],
    },
    { name: "Upcoming Products", href: "#", dropdown: false },
  ]);
}
