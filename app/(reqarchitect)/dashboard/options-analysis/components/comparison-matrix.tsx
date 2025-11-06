'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Award, TrendingUp, Edit2, Save } from 'lucide-react';

import mockData from '@/lib/mock-data/capability-options-analysis.json';

interface ComparisonMatrixProps {
  analysis: any;
}

export function ComparisonMatrix({ analysis }: ComparisonMatrixProps) {
  const [editMode, setEditMode] = useState(false);
  const [scores, setScores] = useState(analysis.scores);

  const capability = mockData.capabilities.find(c => c.id === analysis.capability);
  const selectedOptions = analysis.selectedOptions.map((optionId: string) => {
    const options = (mockData.applicationOptions as any)[analysis.capability] || [];
    return options.find((opt: any) => opt.id === optionId);
  }).filter(Boolean);

  // Calculate weighted scores
  const calculateWeightedScore = (optionId: string) => {
    const optionScores = scores[optionId];
    if (!optionScores) return 0;

    let totalWeighted = 0;
    mockData.evaluationCriteria.forEach(criterion => {
      const score = optionScores[criterion.id] || 0;
      totalWeighted += (score * criterion.weight) / 100;
    });

    return totalWeighted.toFixed(2);
  };

  // Prepare data for charts
  const barChartData = mockData.evaluationCriteria.map(criterion => {
    const dataPoint: any = { name: criterion.name };
    selectedOptions.forEach((option: any) => {
      dataPoint[option.name] = scores[option.id]?.[criterion.id] || 0;
    });
    return dataPoint;
  });

  const radarChartData = mockData.evaluationCriteria.map(criterion => {
    const dataPoint: any = { criterion: criterion.name.substring(0, 15) };
    selectedOptions.forEach((option: any) => {
      dataPoint[option.name] = scores[option.id]?.[criterion.id] || 0;
    });
    return dataPoint;
  });

  const handleScoreChange = (optionId: string, criterionId: string, value: number) => {
    setScores((prev: any) => ({
      ...prev,
      [optionId]: {
        ...prev[optionId],
        [criterionId]: value
      }
    }));
  };

  const weightedScores = selectedOptions.map((option: any) => ({
    name: option.name,
    score: parseFloat(calculateWeightedScore(option.id))
  })).sort((a, b) => b.score - a.score);

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Ranked Option
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{weightedScores[0]?.name}</p>
                <p className="text-xs text-muted-foreground">
                  Score: {weightedScores[0]?.score} / 10
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Options Evaluated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{selectedOptions.length}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Across {mockData.evaluationCriteria.length} criteria
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Score Spread
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {(weightedScores[0]?.score - weightedScores[weightedScores.length - 1]?.score).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Difference between top and lowest
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="matrix" className="space-y-4">
        <TabsList>
          <TabsTrigger value="matrix">Scoring Matrix</TabsTrigger>
          <TabsTrigger value="bar-chart">Bar Chart</TabsTrigger>
          <TabsTrigger value="radar">Radar Chart</TabsTrigger>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
        </TabsList>

        <TabsContent value="matrix" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Evaluation Matrix</CardTitle>
                  <CardDescription>
                    Score each option from 1-10 for each criterion
                  </CardDescription>
                </div>
                <Button
                  variant={editMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit Scores
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Criterion</TableHead>
                      <TableHead className="text-center w-[80px]">Weight</TableHead>
                      {selectedOptions.map((option: any, idx: number) => (
                        <TableHead key={option.id} className="text-center min-w-[150px]">
                          <div className="flex flex-col items-center gap-1">
                            <span>{option.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {option.type}
                            </Badge>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockData.evaluationCriteria.map(criterion => (
                      <TableRow key={criterion.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{criterion.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {criterion.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary">{criterion.weight}%</Badge>
                        </TableCell>
                        {selectedOptions.map((option: any) => {
                          const score = scores[option.id]?.[criterion.id] || 0;
                          return (
                            <TableCell key={option.id} className="text-center">
                              {editMode ? (
                                <div className="space-y-2 px-2">
                                  <Slider
                                    value={[score]}
                                    onValueChange={([value]) =>
                                      handleScoreChange(option.id, criterion.id, value)
                                    }
                                    max={10}
                                    min={0}
                                    step={1}
                                    className="w-full"
                                  />
                                  <p className="text-sm font-semibold">{score}/10</p>
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  <p className="text-2xl font-bold">{score}</p>
                                  <Progress value={score * 10} className="h-1" />
                                </div>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50 font-semibold">
                      <TableCell colSpan={2}>Weighted Total Score</TableCell>
                      {selectedOptions.map((option: any) => (
                        <TableCell key={option.id} className="text-center">
                          <div className="flex flex-col items-center gap-1">
                            <p className="text-2xl font-bold">
                              {calculateWeightedScore(option.id)}
                            </p>
                            <p className="text-xs text-muted-foreground">out of 10</p>
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bar-chart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Criterion-by-Criterion Comparison</CardTitle>
              <CardDescription>
                Compare scores across all evaluation criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      interval={0}
                    />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    {selectedOptions.map((option: any, idx: number) => (
                      <Bar
                        key={option.id}
                        dataKey={option.name}
                        fill={colors[idx % colors.length]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="radar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Radar Chart Comparison</CardTitle>
              <CardDescription>
                Visual representation of strengths and weaknesses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarChartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="criterion" />
                    <PolarRadiusAxis domain={[0, 10]} />
                    {selectedOptions.map((option: any, idx: number) => (
                      <Radar
                        key={option.id}
                        name={option.name}
                        dataKey={option.name}
                        stroke={colors[idx % colors.length]}
                        fill={colors[idx % colors.length]}
                        fillOpacity={0.3}
                      />
                    ))}
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rankings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Final Rankings</CardTitle>
              <CardDescription>
                Options ranked by weighted total score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weightedScores.map((item, idx) => {
                  const option = selectedOptions.find((opt: any) => opt.name === item.name);
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border ${
                        idx === 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center">
                            {idx === 0 && <Award className="h-5 w-5 text-yellow-500 mb-1" />}
                            <Badge variant={idx === 0 ? "default" : "secondary"} className="text-lg px-3 py-1">
                              #{idx + 1}
                            </Badge>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {option?.vendor} • {option?.type}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold">{item.score}</p>
                          <p className="text-sm text-muted-foreground">Weighted Score</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress value={item.score * 10} className="h-2" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
