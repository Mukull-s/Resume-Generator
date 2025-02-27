"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { useDrag, useDrop } from "react-dnd"
import { Label } from "@/components/ui/label"

// Draggable section component
const DraggableSection = ({ id, index, children, onMove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "SECTION",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "SECTION",
    hover(item, monitor) {
      if (item.index !== index) {
        onMove(item.index, index)
        item.index = index
      }
    },
  })

  return (
    <div ref={(node) => drag(drop(node))} className={`cursor-move ${isDragging ? "opacity-50" : "opacity-100"}`}>
      {children}
    </div>
  )
}

export default function EditorPanel({ resumeData, onSectionUpdate }) {
  const [sections, setSections] = useState([
    "personalInfo",
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
  ])

  const moveSection = (fromIndex, toIndex) => {
    const updatedSections = [...sections]
    const [movedItem] = updatedSections.splice(fromIndex, 1)
    updatedSections.splice(toIndex, 0, movedItem)
    setSections(updatedSections)
  }

  const handlePersonalInfoChange = (field, value) => {
    onSectionUpdate("personalInfo", {
      ...resumeData.personalInfo,
      [field]: value,
    })
  }

  const handleSummaryChange = (value) => {
    onSectionUpdate("summary", value)
  }

  const handleArrayItemChange = (section, index, field, value) => {
    const updatedSection = [...resumeData[section]]
    updatedSection[index] = {
      ...updatedSection[index],
      [field]: value,
    }
    onSectionUpdate(section, updatedSection)
  }

  const addArrayItem = (section, template) => {
    onSectionUpdate(section, [...resumeData[section], template])
  }

  const removeArrayItem = (section, index) => {
    const updatedSection = [...resumeData[section]]
    updatedSection.splice(index, 1)
    onSectionUpdate(section, updatedSection)
  }

  return (
    <div className="bg-white/10 dark:bg-dark-card/30 rounded-lg shadow-lg p-4 max-h-[700px] overflow-y-auto glassmorphism">
      <Accordion type="multiple" defaultValue={["personalInfo"]}>
        {sections.map((section, index) => (
          <DraggableSection key={section} id={section} index={index} onMove={moveSection}>
            <AccordionItem
              value={section}
              className="border-pastel-blue/20 dark:border-pastel-darkBlue/20 rounded-md overflow-hidden mb-2 transition-all-medium"
            >
              <AccordionTrigger className="hover:bg-pastel-blue/10 dark:hover:bg-pastel-darkBlue/20 px-4 py-2 rounded-t text-dark-text">
                {getSectionTitle(section)}
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-white/5 dark:bg-dark-card/20">
                {section === "personalInfo" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={resumeData.personalInfo.name || ""}
                        onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                        placeholder="John Doe"
                        className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        value={resumeData.personalInfo.title || ""}
                        onChange={(e) => handlePersonalInfoChange("title", e.target.value)}
                        placeholder="Software Engineer"
                        className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={resumeData.personalInfo.email || ""}
                        onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={resumeData.personalInfo.phone || ""}
                        onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                        placeholder="(123) 456-7890"
                        className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={resumeData.personalInfo.location || ""}
                        onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                        placeholder="New York, NY"
                        className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={resumeData.personalInfo.linkedin || ""}
                        onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
                        placeholder="linkedin.com/in/johndoe"
                        className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                      />
                    </div>
                  </div>
                )}

                {section === "summary" && (
                  <div>
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      value={resumeData.summary || ""}
                      onChange={(e) => handleSummaryChange(e.target.value)}
                      placeholder="Experienced software engineer with a passion for..."
                      className="min-h-[100px] bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                    />
                  </div>
                )}

                {section === "experience" && (
                  <div className="space-y-4">
                    {resumeData.experience.map((exp, idx) => (
                      <div key={idx} className="p-3 border rounded-md dark:border-gray-700 relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-pastel-red/30 dark:hover:bg-pastel-darkRed/30"
                          onClick={() => removeArrayItem("experience", idx)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company || ""}
                              onChange={(e) => handleArrayItemChange("experience", idx, "company", e.target.value)}
                              placeholder="Company Name"
                              className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                          <div>
                            <Label>Position</Label>
                            <Input
                              value={exp.position || ""}
                              onChange={(e) => handleArrayItemChange("experience", idx, "position", e.target.value)}
                              placeholder="Job Title"
                              className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              value={exp.startDate || ""}
                              onChange={(e) => handleArrayItemChange("experience", idx, "startDate", e.target.value)}
                              placeholder="Jan 2020"
                              className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              value={exp.endDate || ""}
                              onChange={(e) => handleArrayItemChange("experience", idx, "endDate", e.target.value)}
                              placeholder="Present"
                              className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description || ""}
                            onChange={(e) => handleArrayItemChange("experience", idx, "description", e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                            className="min-h-[80px] bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full mt-2 bg-pastel-green/20 hover:bg-pastel-green/30 dark:bg-pastel-darkGreen/20 dark:hover:bg-pastel-darkGreen/30 text-dark-text transition-colors duration-300"
                      onClick={() =>
                        addArrayItem("experience", {
                          company: "",
                          position: "",
                          startDate: "",
                          endDate: "",
                          description: "",
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Experience
                    </Button>
                  </div>
                )}

                {section === "education" && (
                  <div className="space-y-4">
                    {resumeData.education.map((edu, idx) => (
                      <div key={idx} className="p-3 border rounded-md dark:border-gray-700 relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-pastel-red/30 dark:hover:bg-pastel-darkRed/30"
                          onClick={() => removeArrayItem("education", idx)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                          <div>
                            <Label>Institution</Label>
                            <Input
                              value={edu.institution || ""}
                              onChange={(e) => handleArrayItemChange("education", idx, "institution", e.target.value)}
                              placeholder="University Name"
                              className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                          <div>
                            <Label>Degree</Label>
                            <Input
                              value={edu.degree || ""}
                              onChange={(e) => handleArrayItemChange("education", idx, "degree", e.target.value)}
                              placeholder="Bachelor of Science"
                              className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                          <div>
                            <Label>Field of Study</Label>
                            <Input
                              value={edu.field || ""}
                              onChange={(e) => handleArrayItemChange("education", idx, "field", e.target.value)}
                              placeholder="Computer Science"
                              className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                          <div>
                            <Label>Graduation Year</Label>
                            <Input
                              value={edu.year || ""}
                              onChange={(e) => handleArrayItemChange("education", idx, "year", e.target.value)}
                              placeholder="2022"
                              className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full mt-2 bg-pastel-green/20 hover:bg-pastel-green/30 dark:bg-pastel-darkGreen/20 dark:hover:bg-pastel-darkGreen/30 text-dark-text transition-colors duration-300"
                      onClick={() =>
                        addArrayItem("education", {
                          institution: "",
                          degree: "",
                          field: "",
                          year: "",
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Education
                    </Button>
                  </div>
                )}

                {section === "skills" && (
                  <div className="space-y-4">
                    <div>
                      <Label>Skills (comma separated)</Label>
                      <Textarea
                        value={resumeData.skills.join(", ")}
                        onChange={(e) =>
                          onSectionUpdate(
                            "skills",
                            e.target.value.split(",").map((skill) => skill.trim()),
                          )
                        }
                        placeholder="JavaScript, React, Node.js, CSS, HTML"
                        className="min-h-[80px] bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                      />
                    </div>
                  </div>
                )}

                {section === "projects" && (
                  <div className="space-y-4">
                    {resumeData.projects.map((project, idx) => (
                      <div key={idx} className="p-3 border rounded-md dark:border-gray-700 relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-pastel-red/30 dark:hover:bg-pastel-darkRed/30"
                          onClick={() => removeArrayItem("projects", idx)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="grid grid-cols-1 gap-4 mb-2">
                          <div>
                            <Label>Project Name</Label>
                            <Input
                              value={project.name || ""}
                              onChange={(e) => handleArrayItemChange("projects", idx, "name", e.target.value)}
                              placeholder="Project Name"
                              className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={project.description || ""}
                              onChange={(e) => handleArrayItemChange("projects", idx, "description", e.target.value)}
                              placeholder="Describe your project..."
                              className="min-h-[80px] bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                          <div>
                            <Label>Technologies Used</Label>
                            <Input
                              value={project.technologies || ""}
                              onChange={(e) => handleArrayItemChange("projects", idx, "technologies", e.target.value)}
                              placeholder="React, Node.js, MongoDB"
                              className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                          <div>
                            <Label>URL (optional)</Label>
                            <Input
                              value={project.url || ""}
                              onChange={(e) => handleArrayItemChange("projects", idx, "url", e.target.value)}
                              placeholder="https://project-url.com"
                              className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full mt-2 bg-pastel-green/20 hover:bg-pastel-green/30 dark:bg-pastel-darkGreen/20 dark:hover:bg-pastel-darkGreen/30 text-dark-text transition-colors duration-300"
                      onClick={() =>
                        addArrayItem("projects", {
                          name: "",
                          description: "",
                          technologies: "",
                          url: "",
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Project
                    </Button>
                  </div>
                )}

                {section === "certifications" && (
                  <div className="space-y-4">
                    {resumeData.certifications.map((cert, idx) => (
                      <div key={idx} className="p-3 border rounded-md dark:border-gray-700 relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-pastel-red/30 dark:hover:bg-pastel-darkRed/30"
                          onClick={() => removeArrayItem("certifications", idx)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                          <div>
                            <Label>Certification Name</Label>
                            <Input
                              value={cert.name || ""}
                              onChange={(e) => handleArrayItemChange("certifications", idx, "name", e.target.value)}
                              placeholder="AWS Certified Developer"
                              className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                          <div>
                            <Label>Issuing Organization</Label>
                            <Input
                              value={cert.issuer || ""}
                              onChange={(e) => handleArrayItemChange("certifications", idx, "issuer", e.target.value)}
                              placeholder="Amazon Web Services"
                              className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                          <div>
                            <Label>Date</Label>
                            <Input
                              value={cert.date || ""}
                              onChange={(e) => handleArrayItemChange("certifications", idx, "date", e.target.value)}
                              placeholder="June 2022"
                              className="bg-white/10 dark:bg-dark-card/30 border-pastel-blue/20 dark:border-pastel-darkBlue/20 text-dark-text"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full mt-2 bg-pastel-green/20 hover:bg-pastel-green/30 dark:bg-pastel-darkGreen/20 dark:hover:bg-pastel-darkGreen/30 text-dark-text transition-colors duration-300"
                      onClick={() =>
                        addArrayItem("certifications", {
                          name: "",
                          issuer: "",
                          date: "",
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Certification
                    </Button>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </DraggableSection>
        ))}
      </Accordion>
    </div>
  )
}

function getSectionTitle(section) {
  const titles = {
    personalInfo: "Personal Information",
    summary: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
  }
  return titles[section] || section
}

