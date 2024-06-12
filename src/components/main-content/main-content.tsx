import React, {useState, useEffect} from "react";
import "./styles.css";

// interface MainContentProps {
//   children: React.ReactNode;
// }

const MainContent: React.FC = () => {
    const [apiData, setApiData] = useState<any>(null); // Initialize with null or an appropriate initial value

    useEffect(() => {
      // Fetch data from your API endpoint
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
      window.api.invoke("READ_SHELTERS").then(function(res: string) {
              console.log(res); // will print "This worked!" to the browser console
              setApiData(JSON.stringify(res));
            })
              .catch(function(err: Error) {
                console.error(err); // will print "This didn't work!" to the browser console.
                setApiData(`ERROR: ${err.message}`);
              });

    }, []);



    return (
      <div>
        {apiData ? (
          <div>
            <h2>Fetched Data</h2>

            <p>API DATA: {apiData}</p>

          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    );
  };

export default MainContent;
