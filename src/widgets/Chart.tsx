import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import React, { JSXElementConstructor, ReactElement, ReactNode } from 'react';

interface ChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactNode & ReactElement<unknown, string | JSXElementConstructor<any>>;
  config: ChartConfig;
  chartTitle?: string;
  chartDesc?: string;
  chartFooterHead?: string;
  chartFooterSubHead?: string;
}

const Chart: React.FC<ChartProps> = ({
  children,
  config,
  chartTitle,
  chartDesc,
  chartFooterHead,
  chartFooterSubHead,
}) => {
  return (
    <div className=''>
      <Card>
        <CardHeader>
          <CardTitle>{chartTitle}</CardTitle>
          <CardDescription>{chartDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config}>{children}</ChartContainer>
        </CardContent>
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          <div className='flex gap-2 font-medium leading-none'>{chartFooterHead}</div>
          <div className='leading-none text-muted-foreground'>{chartFooterSubHead}</div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chart;
