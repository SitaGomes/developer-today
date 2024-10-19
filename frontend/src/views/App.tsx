import { useNavigate } from 'react-router-dom';
import { useGetCountries } from '../hooks/useGetCountries';
import { ROUTES } from '../contants';

function App() {
  const { data, isLoading } = useGetCountries();
  const navigateTo = useNavigate();

  const handleCountry = (code: string) => {
    navigateTo(ROUTES.COUNTRY.replace(':code', code));
  };

  if (!data?.data || isLoading) {
    return (
      <div className="bg-gray-800 min-h-screen flex justify-center items-center text-white">
        Loading data...
      </div>
    );
  }

  return (
    <main className="bg-gray-800 text-white flex flex-col gap-4">
      {data.data.map((country) => (
        <section
          key={country.code}
          className="flex items-center gap-2 p-3 hover:underline cursor-pointer"
          onClick={() => handleCountry(country.code)}
        >
          <div className="text-lg font-bold">{country.name}</div>
          <div>{country.code}</div>
        </section>
      ))}
    </main>
  );
}

export default App;
