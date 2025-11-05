"use client"

import * as React from "react"
import { Check, ChevronsUpDown, FolderKanban, Plus, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useProject, Project } from "@/lib/contexts/project-context"
import { Badge } from "@/components/ui/badge"

const statusColors = {
  planning: "bg-gray-500",
  active: "bg-green-500",
  "on-hold": "bg-yellow-500",
  completed: "bg-blue-500",
  cancelled: "bg-red-500",
}

const priorityColors = {
  low: "text-gray-600",
  medium: "text-blue-600",
  high: "text-orange-600",
  critical: "text-red-600",
}

export function ProjectSwitcher() {
  const [open, setOpen] = React.useState(false)
  const { selectedProject, setSelectedProject, projects, setProjects, isLoading, setIsLoading } = useProject()

  // Fetch projects on mount
  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        // TODO: Get organizationId from session/auth
        const organizationId = "default-org" // Placeholder
        const response = await fetch(`/api/projects?organizationId=${organizationId}`)

        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }

        const data = await response.json()
        setProjects(data.projects || [])

        // If no project is selected but projects exist, select the first active one
        if (!selectedProject && data.projects.length > 0) {
          const activeProject = data.projects.find((p: Project) => p.status === 'active') || data.projects[0]
          setSelectedProject(activeProject)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project)
    setOpen(false)
  }

  const handleCreateNewProject = () => {
    setOpen(false)
    // TODO: Implement project creation modal/flow
    console.log("Create new project clicked")
    // This could navigate to /project-management or open a dialog
    window.location.href = "/project-management"
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a project"
          className="w-full justify-between"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span className="truncate">Loading projects...</span>
            </>
          ) : selectedProject ? (
            <>
              <FolderKanban className="mr-2 h-4 w-4 shrink-0" />
              <span className="truncate flex-1 text-left">{selectedProject.name}</span>
              <div className={cn("ml-2 h-2 w-2 rounded-full shrink-0", statusColors[selectedProject.status])} />
            </>
          ) : (
            <>
              <FolderKanban className="mr-2 h-4 w-4 shrink-0" />
              <span className="truncate flex-1 text-left">Select project...</span>
            </>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search projects..." />
          <CommandList>
            <CommandEmpty>
              {isLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                "No projects found."
              )}
            </CommandEmpty>
            {!isLoading && projects.length > 0 && (
              <>
                <CommandGroup heading="Active Projects">
                  {projects
                    .filter((project) => project.status === "active")
                    .map((project) => (
                      <CommandItem
                        key={project.id}
                        onSelect={() => handleSelectProject(project)}
                        className="flex items-center gap-2"
                      >
                        <FolderKanban className="h-4 w-4 shrink-0" />
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-medium">{project.name}</span>
                            <Badge variant="outline" className={cn("text-xs", priorityColors[project.priority])}>
                              {project.priority}
                            </Badge>
                          </div>
                          {project.description && (
                            <p className="text-xs text-muted-foreground truncate">{project.description}</p>
                          )}
                        </div>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4 shrink-0",
                            selectedProject?.id === project.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>

                {projects.some((p) => p.status !== "active") && (
                  <>
                    <CommandSeparator />
                    <CommandGroup heading="Other Projects">
                      {projects
                        .filter((project) => project.status !== "active")
                        .map((project) => (
                          <CommandItem
                            key={project.id}
                            onSelect={() => handleSelectProject(project)}
                            className="flex items-center gap-2"
                          >
                            <FolderKanban className="h-4 w-4 shrink-0" />
                            <div className="flex-1 overflow-hidden">
                              <div className="flex items-center gap-2">
                                <span className="truncate text-sm font-medium">{project.name}</span>
                                <div className={cn("h-2 w-2 rounded-full", statusColors[project.status])} />
                              </div>
                              {project.description && (
                                <p className="text-xs text-muted-foreground truncate">{project.description}</p>
                              )}
                            </div>
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4 shrink-0",
                                selectedProject?.id === project.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </>
                )}
              </>
            )}
          </CommandList>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem onSelect={handleCreateNewProject} className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              <span>Create new project</span>
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
