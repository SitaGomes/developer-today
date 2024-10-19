import { useNavigate, useParams } from 'react-router-dom';
import { useGetCountry } from '../hooks/useGetCountry';
import { ROUTES } from '../contants';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../components/ui/chart';
import { CardContent } from '../components/ui/card';

const chartConfig = {
  value: {
    label: 'Population',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function Country() {
  const param = useParams();
  const navigateTo = useNavigate();

  const { data, isLoading } = useGetCountry(param.code || '');

  const handleCountry = (code: string) => {
    navigateTo(ROUTES.COUNTRY.replace(':code', code));
  };

  const handleHome = () => navigateTo(ROUTES.LANDING);

  if (!data?.data || isLoading) {
    return (
      <div className="bg-gray-800 min-h-screen flex justify-center items-center text-white">
        Loading data...
      </div>
    );
  }

  return (
    <main className="bg-gray-800 text-white min-h-screen flex flex-col gap-4">
      <section className="hover:underline cursor-pointer" onClick={handleHome}>
        Go to home
      </section>
      <section className="flex flex-col gap-2 items-center">
        <img
          className="w-[200px] lg:w-[500px]"
          src={data.data.flag}
          alt="Flag"
        />
        <h1 className="text-2xl lg:text-4xl font-bold">{data.data.name}</h1>
      </section>
      <section>
        <h1>Borders:</h1>
        <div className="flex">
          {data.data.borders.map((country) => (
            <section
              key={country.code}
              className="flex items-center gap-2 p-3 hover:underline cursor-pointer"
              onClick={() => handleCountry(country.code)}
            >
              <div className="text-lg font-bold">{country.name}</div>
              <div>{country.code}</div>
            </section>
          ))}
        </div>
      </section>
      <section>
        <h1>Population</h1>

        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={data.data.population}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis dataKey="value" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={'value'}
                name="population"
                stroke="#8884d8"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </section>
    </main>
  );
}
