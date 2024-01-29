type propsType = {
  index: number;
  user: ScoreboardUserData;
};

export type ScoreboardUserData = {
  user_id: number;
  user_name: string;
  scores: number[];
};

function TableRow({ index, user }: propsType) {
  return (
    <tr className="bg-gray-50 hover:bg-gray-200">
      <th
        scope="row"
        className="border-b border-gray-400 bg-indigo-200 text-center">
        {index}
      </th>
      <td className="border-b border-l border-gray-400 text-center">{user.user_name}</td>
      {user?.scores.map((score) => <td className="border-b border-l border-gray-400 text-center">{score}</td>)}
    </tr>
  );
}
export default TableRow;
