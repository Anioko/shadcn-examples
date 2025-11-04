"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Cardinality, Optionality } from "../edges/crowsfoot-edge"

type RelationshipType = "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many" | "custom"

interface EdgeEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  label?: string
  sourceCardinality?: Cardinality
  targetCardinality?: Cardinality
  sourceOptionality?: Optionality
  targetOptionality?: Optionality
  sourceExactlyOne?: boolean
  targetExactlyOne?: boolean
  relationshipType?: string
  onSave: (data: {
    label?: string
    sourceCardinality: Cardinality
    targetCardinality: Cardinality
    sourceOptionality: Optionality
    targetOptionality: Optionality
    sourceExactlyOne?: boolean
    targetExactlyOne?: boolean
    relationshipType?: string
  }) => void
  onDelete?: () => void
}

export function EdgeEditDialog({
  open,
  onOpenChange,
  label: initialLabel,
  sourceCardinality: initialSourceCard,
  targetCardinality: initialTargetCard,
  sourceOptionality: initialSourceOpt,
  targetOptionality: initialTargetOpt,
  sourceExactlyOne: initialSourceExactly,
  targetExactlyOne: initialTargetExactly,
  relationshipType: initialRelType,
  onSave,
  onDelete,
}: EdgeEditDialogProps) {
  const [label, setLabel] = useState(initialLabel || "")
  const [relationshipType, setRelationshipType] = useState<RelationshipType>(
    (initialRelType as RelationshipType) || "one-to-many"
  )

  // Custom settings
  const [sourceCard, setSourceCard] = useState<Cardinality>(initialSourceCard || "one")
  const [targetCard, setTargetCard] = useState<Cardinality>(initialTargetCard || "many")
  const [sourceOpt, setSourceOpt] = useState<Optionality>(initialSourceOpt || "mandatory")
  const [targetOpt, setTargetOpt] = useState<Optionality>(initialTargetOpt || "optional")
  const [sourceExactly, setSourceExactly] = useState(initialSourceExactly || false)
  const [targetExactly, setTargetExactly] = useState(initialTargetExactly || false)

  const handlePresetChange = (preset: RelationshipType) => {
    setRelationshipType(preset)

    switch (preset) {
      case "one-to-one":
        setSourceCard("one")
        setTargetCard("one")
        setSourceOpt("mandatory")
        setTargetOpt("mandatory")
        setSourceExactly(false)
        setTargetExactly(false)
        break
      case "one-to-many":
        setSourceCard("one")
        setTargetCard("many")
        setSourceOpt("mandatory")
        setTargetOpt("optional")
        setSourceExactly(false)
        setTargetExactly(false)
        break
      case "many-to-one":
        setSourceCard("many")
        setTargetCard("one")
        setSourceOpt("optional")
        setTargetOpt("mandatory")
        setSourceExactly(false)
        setTargetExactly(false)
        break
      case "many-to-many":
        setSourceCard("many")
        setTargetCard("many")
        setSourceOpt("optional")
        setTargetOpt("optional")
        setSourceExactly(false)
        setTargetExactly(false)
        break
      case "custom":
        // Keep current settings
        break
    }
  }

  const handleSave = () => {
    onSave({
      label: label || undefined,
      sourceCardinality: sourceCard,
      targetCardinality: targetCard,
      sourceOptionality: sourceOpt,
      targetOptionality: targetOpt,
      sourceExactlyOne: sourceExactly,
      targetExactlyOne: targetExactly,
      relationshipType: relationshipType !== "custom" ? relationshipType : undefined,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Relationship</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Label */}
          <div className="space-y-2">
            <Label htmlFor="label">Relationship Label</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., has, belongs to, contains"
            />
          </div>

          {/* Relationship Type Presets */}
          <div className="space-y-3">
            <Label>Relationship Type</Label>
            <RadioGroup
              value={relationshipType}
              onValueChange={(value) => handlePresetChange(value as RelationshipType)}
            >
              <div className="grid grid-cols-2 gap-3">
                <Card className={relationshipType === "one-to-one" ? "border-blue-500 ring-1 ring-blue-200" : ""}>
                  <CardHeader className="p-3">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="one-to-one" id="one-to-one" />
                      <CardTitle className="text-sm">One-to-One</CardTitle>
                    </div>
                    <CardDescription className="text-xs">
                      Each record relates to exactly one record
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className={relationshipType === "one-to-many" ? "border-blue-500 ring-1 ring-blue-200" : ""}>
                  <CardHeader className="p-3">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="one-to-many" id="one-to-many" />
                      <CardTitle className="text-sm">One-to-Many</CardTitle>
                    </div>
                    <CardDescription className="text-xs">
                      One record can relate to many records
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className={relationshipType === "many-to-one" ? "border-blue-500 ring-1 ring-blue-200" : ""}>
                  <CardHeader className="p-3">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="many-to-one" id="many-to-one" />
                      <CardTitle className="text-sm">Many-to-One</CardTitle>
                    </div>
                    <CardDescription className="text-xs">
                      Many records relate to one record
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className={relationshipType === "many-to-many" ? "border-blue-500 ring-1 ring-blue-200" : ""}>
                  <CardHeader className="p-3">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="many-to-many" id="many-to-many" />
                      <CardTitle className="text-sm">Many-to-Many</CardTitle>
                    </div>
                    <CardDescription className="text-xs">
                      Records can relate to multiple records
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className={relationshipType === "custom" ? "border-blue-500 ring-1 ring-blue-200" : ""}>
                  <CardHeader className="p-3">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <CardTitle className="text-sm">Custom</CardTitle>
                    </div>
                    <CardDescription className="text-xs">
                      Configure manually
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </RadioGroup>
          </div>

          {/* Custom Configuration */}
          {relationshipType === "custom" && (
            <>
              <Separator />
              <div className="space-y-4">
                <Label className="text-base font-semibold">Custom Configuration</Label>

                <div className="grid grid-cols-2 gap-6">
                  {/* Source End */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-blue-600">Source End (From)</Label>

                    <div className="space-y-2">
                      <Label className="text-xs">Cardinality</Label>
                      <RadioGroup value={sourceCard} onValueChange={(v) => setSourceCard(v as Cardinality)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="one" id="source-one" />
                          <Label htmlFor="source-one" className="text-xs font-normal cursor-pointer">
                            One
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="many" id="source-many" />
                          <Label htmlFor="source-many" className="text-xs font-normal cursor-pointer">
                            Many
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Optionality</Label>
                      <RadioGroup value={sourceOpt} onValueChange={(v) => setSourceOpt(v as Optionality)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mandatory" id="source-mandatory" />
                          <Label htmlFor="source-mandatory" className="text-xs font-normal cursor-pointer">
                            Mandatory (must exist)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="optional" id="source-optional" />
                          <Label htmlFor="source-optional" className="text-xs font-normal cursor-pointer">
                            Optional (may exist)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="source-exactly"
                        checked={sourceExactly}
                        onCheckedChange={(checked) => setSourceExactly(!!checked)}
                      />
                      <Label htmlFor="source-exactly" className="text-xs cursor-pointer">
                        Exactly one (one and only one)
                      </Label>
                    </div>
                  </div>

                  {/* Target End */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-green-600">Target End (To)</Label>

                    <div className="space-y-2">
                      <Label className="text-xs">Cardinality</Label>
                      <RadioGroup value={targetCard} onValueChange={(v) => setTargetCard(v as Cardinality)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="one" id="target-one" />
                          <Label htmlFor="target-one" className="text-xs font-normal cursor-pointer">
                            One
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="many" id="target-many" />
                          <Label htmlFor="target-many" className="text-xs font-normal cursor-pointer">
                            Many
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Optionality</Label>
                      <RadioGroup value={targetOpt} onValueChange={(v) => setTargetOpt(v as Optionality)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mandatory" id="target-mandatory" />
                          <Label htmlFor="target-mandatory" className="text-xs font-normal cursor-pointer">
                            Mandatory (must exist)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="optional" id="target-optional" />
                          <Label htmlFor="target-optional" className="text-xs font-normal cursor-pointer">
                            Optional (may exist)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="target-exactly"
                        checked={targetExactly}
                        onCheckedChange={(checked) => setTargetExactly(!!checked)}
                      />
                      <Label htmlFor="target-exactly" className="text-xs cursor-pointer">
                        Exactly one (one and only one)
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {onDelete && (
              <Button
                variant="destructive"
                onClick={() => {
                  onDelete()
                  onOpenChange(false)
                }}
              >
                Delete Relationship
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
