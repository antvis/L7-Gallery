import type { ChoroplethLayerProps, LarkMapProps } from '@antv/larkmap';
import { message } from 'antd';

export const layerOptions: Omit<ChoroplethLayerProps, 'source'> = {
  autoFit: true,
  fillColor: '#377eb8',
  opacity: 0.3,
  strokeColor: 'blue',
  lineWidth: 0.5,
  state: {
    active: { strokeColor: 'green', lineWidth: 1.5, lineOpacity: 0.8 },
    select: { strokeColor: 'red', lineWidth: 1.5, lineOpacity: 0.8 },
  },
};

export const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    zoom: 3,
    doubleClickZoom: false,
  },
};

export const DrillingType: Record<any, any> = {
  country: 'province',
  province: 'city',
  city: 'district',
};

export const RollupType: Record<any, any> = {
  district: 'city',
  city: 'province',
  province: 'country',
  country: '',
  jiuduanxian: '',
};

export const copy = (data: any) => {
  const oInput = document.createElement('input');
  oInput.value = data;
  document.body.appendChild(oInput);
  oInput.select();
  document.execCommand('Copy');
  oInput.style.display = 'none';
  message.success('复制成功');
};

export const bulkDownload = (data: any, level: string) => {
  const download = document.createElement('a');
  download.download = `${level}.json`;
  download.href = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data),
  )}`;
  download.target = '_blank';
  download.rel = 'noreferrer';
  download.click();
};

export const item = () => {
  return [
    {
      layer: 'myChoroplethLayer',
      fields: [
        {
          field: 'name',
          formatField: () => '名称',
        },
        {
          field: 'adcode',
          formatField: '行政编号',
        },
      ],
    },
  ];
};

export const cityValue = (level: string) => {
  return {
    country: [
      { label: '省', value: 'province' },
      { label: '市', value: 'city' },
      { label: '县', value: 'district' },
    ],
    province: [
      { label: '市', value: 'city' },
      { label: '县', value: 'district' },
    ],
    city: [{ label: '县', value: 'district' }],
    district: [],
  }[level];
};

export const sourceOptions = [
  { value: 'DataVSource', label: 'dataV数据源' },
  { value: 'RDBSource', label: '数据源' },
];

export type DataType =
  | 'GeoJSON'
  | 'TopoJSON'
  | 'Shapefiles'
  | 'JSON'
  | 'CSV'
  | 'KML';
export const downloadDataType = [
  { key: 'GeoJSON', value: 'GeoJSON', label: 'GeoJSON' },
  { key: 'TopoJSON', value: 'TopoJSON', label: 'TopoJSON' },
  { key: 'Shapefiles', value: 'Shapefiles', label: 'Shapefiles' },
  { key: 'JSON', value: 'JSON', label: 'JSON' },
  { key: 'CSV', value: 'CSV', label: 'CSV' },
  { key: 'KML', value: 'KML', label: 'KML' },
];
export const editionOptions = {
  DataVSource: [
    { value: 'areas_v3', label: 'areas_v3' },
    { value: 'areas_v2', label: 'areas_v2' },
  ],
  RDBSource: [
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
  ],
};

export const accuracyOption = [
  { value: 'low', label: '低' },
  { value: 'middle', label: '中' },
  { value: 'high', label: '高' },
];
