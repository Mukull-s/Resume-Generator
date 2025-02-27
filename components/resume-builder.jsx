"use client"

import { useState, useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoonIcon, SunIcon, Download, Save, Undo, Redo } from "lucide-react"
import EditorPanel from "@/components/editor-panel"
import TemplateSelector from "@/components/template-selector"
import ResumePreview from "@/components/resume-preview"
import AIPanel from "@/components/ai-panel"
import { defaultResumeData } from "@/lib/default-data"
import { useTheme } from "@/hooks/use-theme"

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useLocalStorage("resumeData", defaultResumeData)
  const [activeTemplate, setActiveTemplate] = useState("professional")
  const [history, setHistory] = useState([defaultResumeData])
  const [historyIndex, setHistoryIndex] = useState(0)
  const { theme, toggleTheme } = useTheme()

  // ... (previous useEffect and handler functions)

  useEffect(() => {
    if (JSON.stringify(resumeData) !== JSON.stringify(history[historyIndex])) {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(JSON.parse(JSON.stringify(resumeData)))
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }, [resumeData, history, historyIndex])

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setResumeData(history[historyIndex - 1])
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setResumeData(history[historyIndex + 1])
    }
  }

  const updateResumeData = (newData) => {
    setResumeData({ ...resumeData, ...newData })
  }

  const handleSectionUpdate = (sectionName, sectionData) => {
    setResumeData({
      ...resumeData,
      [sectionName]: sectionData,
    })
  }

  const handleExport = async () => {
    // This would be replaced with actual PDF export functionality
    alert("Exporting as PDF...")
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-pastel-blue/10 to-pastel-purple/10 dark:from-dark-background dark:to-dark-card">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pastel-purple to-pastel-blue dark:from-pastel-darkPurple dark:to-pastel-darkBlue bg-clip-text text-transparent">
            AI Resume Builder
          </h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-pastel-blue/20 dark:hover:bg-pastel-darkBlue/30 transition-colors duration-300"
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleUndo}
              disabled={historyIndex === 0}
              className="hover:bg-pastel-yellow/20 dark:hover:bg-pastel-darkYellow/30 transition-colors duration-300"
            >
              <Undo className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRedo}
              disabled={historyIndex === history.length - 1}
              className="hover:bg-pastel-yellow/20 dark:hover:bg-pastel-darkYellow/30 transition-colors duration-300"
            >
              <Redo className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="gap-2 hover:bg-pastel-green/20 dark:hover:bg-pastel-darkGreen/30 transition-colors duration-300"
            >
              <Save className="h-4 w-4" /> Save
            </Button>
            <Button
              className="gap-2 bg-pastel-purple/80 hover:bg-pastel-darkPurple/90 text-white dark:bg-pastel-purple/90 dark:hover:bg-pastel-darkPurple transition-colors duration-300"
              onClick={handleExport}
            >
              <Download className="h-4 w-4" /> Export PDF
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <Tabs defaultValue="editor" className="animate-fade-in">
              <TabsList className="grid grid-cols-3 mb-4 bg-pastel-blue/10 dark:bg-pastel-darkBlue/20 rounded-lg overflow-hidden glassmorphism">
                <TabsTrigger
                  value="editor"
                  className="data-[state=active]:bg-pastel-blue/30 dark:data-[state=active]:bg-pastel-darkBlue/40 data-[state=active]:text-white"
                >
                  Editor
                </TabsTrigger>
                <TabsTrigger
                  value="templates"
                  className="data-[state=active]:bg-pastel-green/30 dark:data-[state=active]:bg-pastel-darkGreen/40 data-[state=active]:text-white"
                >
                  Templates
                </TabsTrigger>
                <TabsTrigger
                  value="ai"
                  className="data-[state=active]:bg-pastel-purple/30 dark:data-[state=active]:bg-pastel-darkPurple/40 data-[state=active]:text-white"
                >
                  AI Assistant
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="space-y-4 animate-slide-up">
                <EditorPanel resumeData={resumeData} onSectionUpdate={handleSectionUpdate} />
              </TabsContent>

              <TabsContent value="templates" className="animate-slide-up">
                <TemplateSelector activeTemplate={activeTemplate} onSelectTemplate={setActiveTemplate} />
              </TabsContent>

              <TabsContent value="ai" className="animate-slide-up">
                <AIPanel resumeData={resumeData} onSuggestionApply={updateResumeData} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white/10 dark:bg-dark-card/30 rounded-lg shadow-lg p-6 h-[842px] overflow-auto border border-pastel-blue/20 dark:border-pastel-darkBlue/20 transition-all-medium glassmorphism">
              <ResumePreview resumeData={resumeData} template={activeTemplate} />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

