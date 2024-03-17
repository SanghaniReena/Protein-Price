type SourceType = {
    _id: string;
    url: string;
    createdAt: number;
    updatedAt: number;
  };
  
  export type DataSourceType = {
    sources: SourceType[];
  };
  