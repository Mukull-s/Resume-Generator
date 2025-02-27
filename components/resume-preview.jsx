"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ProfessionalTemplate } from "@/components/templates/professional-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { MinimalTemplate } from "@/components/templates/minimal-template"
import { AcademicTemplate } from "@/components/templates/academic-template"

export default function ResumePreview({ resumeData, template }) {
  const previewRef = useRef(null)

  useEffect(() => {
    if (previewRef.current) {
      gsap.fromTo(previewRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
    }
  }, [])

  const renderTemplate = () => {
    switch (template) {
      case "professional":
        return <ProfessionalTemplate data={resumeData} />
      case "creative":
        return <CreativeTemplate data={resumeData} />
      case "minimal":
        return <MinimalTemplate data={resumeData} />
      case "academic":
        return <AcademicTemplate data={resumeData} />
      default:
        return <ProfessionalTemplate data={resumeData} />
    }
  }

  return (
    <div ref={previewRef} className="resume-preview">
      {renderTemplate()}
    </div>
  )
}

