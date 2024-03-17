import React, { useEffect, useState } from "react";
import axios from "../axios.tsx";
import { Box, Typography, List, Link, Skeleton } from "@mui/material";
import { AxiosResponse } from "axios";
import { DataSourceType } from "../types/dataSource.type.tsx";

const DataSource = () => {
  // State to store the fetched data source
  const [dataSource, setDataSource] = useState([] as unknown as DataSourceType);
  // State to track loading state
  const [isLoading, setIsLoading] = useState(true as Boolean);

  useEffect(() => {
    (async () => {
      try {
        // Make a GET request to fetch data source
        const { data }: AxiosResponse<DataSourceType> = await axios.get(
          "/source/all"
        );
        setDataSource(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    })();
  }, []); // Run only once on component mount

  return (
    <Box sx={{ p: 2 }}>
      <Typography sx={{ fontWeight: 500 }}>Data source</Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {isLoading ? ( // Show skeleton loader if data is loading
          <Box sx={{ maxWidth: 150 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        ) : (
          // Render data source list if data is loaded
          dataSource?.sources?.map((source, i) => {
            return (
              <React.Fragment key={i}>
                {/* Render each data source as a link */}
                <Link href={source.url} key={i}>
                  {source.url}
                </Link>
                <br />
              </React.Fragment>
            );
          })
        )}
      </List>
    </Box>
  );
};

export default DataSource;