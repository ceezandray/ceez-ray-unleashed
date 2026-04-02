const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/images/bpf-logo.png" alt="Black Picket Fences" className="h-8 w-auto" loading="lazy" />
            <span className="font-heading text-sm tracking-widest text-muted-foreground">
              BLACK PICKET FENCES
            </span>
          </div>
          <div className="flex gap-8">
            {["Home", "About", "Episodes", "Shop"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-heading text-xs tracking-wider text-muted-foreground hover:text-primary transition-colors"
              >
                {item.toUpperCase()}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            © 2025 Black Picket Fences. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
