import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutBPF = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-sm tracking-[0.3em] text-muted-foreground mb-4">
              THE STUDIO
            </h1>
            <h2 className="font-heading text-5xl md:text-6xl text-primary mb-6">
              BLACK PICKET FENCE
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Black Picket Fence Entertainment is an independent animation studio dedicated to telling bold, unapologetic stories rooted in culture, comedy, and community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <img
                src="/images/gorilla-bpf.png"
                alt="Ceez - BPF Gorilla"
                className="w-64 lg:w-80 object-contain drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 font-body text-muted-foreground leading-relaxed"
            >
              <p>
                Founded with a mission to bring fresh, diverse voices to the world of adult animation, Black Picket Fence Entertainment creates content that reflects the real experiences, humor, and energy of urban culture — without the filter.
              </p>
              <p>
                Our flagship series, <span className="text-primary font-semibold">Ceez & Ray</span>, is an AI-animated comedy that follows two best friends navigating life in the city — from street-level hustles to laugh-out-loud misadventures. It's raw, it's real, and it's built for a generation that demands authenticity.
              </p>
              <p>
                At BPF, we believe in pushing the boundaries of storytelling through technology, blending cutting-edge AI animation with sharp writing and characters you'll never forget.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutBPF;
