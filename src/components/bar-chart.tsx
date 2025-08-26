interface BarChartProps {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  maxValue?: number;
}

export function BarChart({ data, maxValue }: BarChartProps) {
  const max = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{item.label}</span>
            <span className="text-muted-foreground">{item.value}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: item.color || "hsl(var(--primary))",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
