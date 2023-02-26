import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import React, { useEffect, useState } from 'react';

interface DataType {
  name: string;
  adcode: number;
  name_en: string;
  name_var: string;
  city_type: string;
  city_adcode: string;
  province: string;
  province_adcode: string;
  province_type: string;
  county: string;
  county_adcode: string;
  county_type: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'name',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: 'adcode',
    dataIndex: 'adcode',
  },
  {
    title: 'county',
    dataIndex: 'county',
  },
  {
    title: 'county_type',
    dataIndex: 'county_type',
  },
  {
    title: 'city_type',
    dataIndex: 'city_type',
  },
  {
    title: 'county_adcode',
    dataIndex: 'county_adcode',
  },
  {
    title: 'city_adcode',
    dataIndex: 'city_adcode',
  },
  {
    title: 'name_en',
    dataIndex: 'name_en',
  },
  {
    title: 'name_var',
    dataIndex: 'name_var',
  },
  {
    title: 'province_adcode',
    dataIndex: 'province_adcode',
  },
  {
    title: 'province',
    dataIndex: 'province',
  },
  {
    title: 'province_type',
    dataIndex: 'province_type',
  },
];

interface IProps {
  onDataLoad: (data: any) => void;
}

const App: React.FC<IProps> = (props: IProps) => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch(`https://unpkg.com/xingzhengqu@2023/data/county.pbf`)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        // 数据解码为geojson
        const geojson = geobuf.decode(new Pbf(data));
        props?.onDataLoad({ county: geojson });
        // @ts-ignore
        const results = geojson.features.map((feature: any) => {
          return feature.properties;
        });
        setData(results);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.adcode}
      dataSource={data}
      loading={loading}
      size="small"
      scroll={{ x: 1000, y: 500 }}
      pagination={{
        pageSize: 50,
        simple: true,
      }}
    />
  );
};

export default App;
