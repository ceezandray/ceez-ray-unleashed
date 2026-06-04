import { useNavigate } from "react-router-dom";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-bpf" },
  { label: "Media", href: "/episodes" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer">
            <img src="/images/bpf-logo.png" alt="Black Picket Fence Entertainment" className="h-8 w-auto" loading="lazy" />
            <span className="font-heading text-sm tracking-widest text-muted-foreground">
              BLACK PICKET FENCE
            </span>
          </a>
          <div className="flex gap-8">
            {footerLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.href)}
                className="font-heading text-xs tracking-wider text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label.toUpperCase()}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            © 2025 Black Picket Fence Entertainment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
