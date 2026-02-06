interface DisplayProps {
  value: string;
}

const Display = ({ value }: DisplayProps) => {
  return (
    <div className="bg-slate-900 rounded-lg p-6 mb-4 text-right">
      <div className="text-4xl font-light text-white overflow-hidden overflow-ellipsis">
        {value}
      </div>
    </div>
  );
};

export default Display;
