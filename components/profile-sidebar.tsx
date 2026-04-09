import { Mail, Phone, MapPin, Download } from 'lucide-react'
import { Github, Twitter, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'
import { profileData } from '@/lib/portfolio-data'

interface ProfileSidebarProps {
  data?: typeof profileData
}

export function ProfileSidebar({ data = profileData }: ProfileSidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full lg:w-80 bg-card rounded-2xl border border-border p-4 md:p-6 lg:sticky lg:top-8 h-fit"
    >
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.1, ease: 'easeOut' }}
          className="relative w-28 h-32 md:w-36 md:h-40 mb-4 md:mb-6"
        >
          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-accent/20 via-accent/5 to-transparent animate-pulse-slow" />
          <motion.div
            className="absolute inset-0.5 rounded-3xl bg-secondary overflow-hidden"
            animate={{ scale: [1, 1.04, 1], opacity: [1, 0.9, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.03 }}
          >
            <motion.img
              src={data.avatar || "/placeholder.svg"}
              alt={data.name}
              className="w-full h-full object-cover object-top"
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>

        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">{data.name}</h1>
        <p className="text-xs md:text-sm text-muted-foreground bg-secondary px-3 md:px-4 py-1 rounded-lg">
          {data.title}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border my-4 md:my-6" />

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.2, ease: 'easeOut' }}
          className="flex items-start gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground uppercase mb-1">Email</p>
            <a
              href={`mailto:${data.email}`}
              className="text-sm text-foreground hover:text-accent transition-colors break-all"
            >
              {data.email}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.27, ease: 'easeOut' }}
          className="flex items-start gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase mb-1">Phone</p>
            <a
              href={`tel:${data.phone.replace(/\s/g, '')}`}
              className="text-sm text-foreground hover:text-accent transition-colors"
            >
              {data.phone}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.41, ease: 'easeOut' }}
          className="flex items-start gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase mb-1">Location</p>
            <p className="text-sm text-foreground">{data.location}</p>
            <a
              href={data.resumeUrl}
              download
              className="mt-5 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-accent text-white text-xs md:text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4 text-white" />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
        <motion.a
          href={data.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
          aria-label="GitHub"
          whileHover={{ y: -3, scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        >
          <Github className="w-5 h-5" />
        </motion.a>
        <motion.a
          href={data.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
          aria-label="Twitter"
          whileHover={{ y: -3, scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        >
          <Twitter className="w-5 h-5" />
        </motion.a>
        <motion.a
          href={data.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
          aria-label="Instagram"
          whileHover={{ y: -3, scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        >
          <Instagram className="w-5 h-5" />
        </motion.a>
      </div>
    </motion.aside>
  )
}
