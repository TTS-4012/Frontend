type propsType = {
  index: number;
  user: user;
};
export type user = {
  user_id: number;
  username: string;
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
      <td className="border-b border-l border-gray-400 text-center">{user.username}</td>
      {user?.scores.map((score) => <td className="border-b border-l border-gray-400 text-center">{score}</td>)}
    </tr>
  );
}
export default TableRow;
