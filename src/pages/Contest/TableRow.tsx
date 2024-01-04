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
    <tr>
      <th scope="row">{index}</th>
      <td>{user.username}</td>
      {user?.scores.map((score) => <td>{score}</td>)}
    </tr>
  );
}
export default TableRow;
