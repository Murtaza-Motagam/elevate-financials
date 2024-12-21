import React from 'react'
import { CartesianGrid, LabelList, Line, LineChart, Pie, PieChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { TrendingUp } from 'lucide-react'

const accOverviewData = [
  { month: "January", balance: 186 },
  { month: "February", balance: 305 },
  { month: "March", balance: 237 },
  { month: "April", balance: 73 },
  { month: "May", balance: 209 },
  { month: "June", balance: 214 },
]
const chartConfigAccOverview = {
  desktop: {
    label: "Balance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const chartDataDtCt = [
  { transactionType: "Credit", transactions: 275, fill: "#22c55e" },
  { transactionType: "Debit", transactions: 200, fill: "#dc2626" },
];

const chartConfigDtCt = {
  Credit: {
    label: "Credit",
  },
  Debit: {
    label: "Debit",
  },
} satisfies ChartConfig;

const Dashboard = () => {

  return (
    <div className="w-full mx-4">
      <h1 className='border-b border-gray-400 pb-2 font-semibold text-lg md:text-xl uppercase'>Accounts Dashboard</h1>
      <div className='w-full grid grid-cols-3 gap-4 p-4'>
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
              <CardDescription>January - November 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigAccOverview}>
                <LineChart
                  accessibilityLayer
                  data={accOverviewData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="balance"
                    type="natural"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total balance graph of last 11 months
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="">
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Debit/Credit Transaction History</CardTitle>
              <CardDescription>January - November 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfigDtCt}
                className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
              >
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="transactionType" hideLabel />}
                  />
                  <Pie data={chartDataDtCt} dataKey="transactions" nameKey="transactionType">
                    <LabelList
                      dataKey="transactionType"
                      className="fill-background"
                      stroke="none"
                      fontSize={12}
                      formatter={(value: keyof typeof chartConfigDtCt) =>
                        chartConfigDtCt[value]?.label
                      }
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Credit transactions increased by 5% this month
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing debit/credit transactions of last 11 months
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
