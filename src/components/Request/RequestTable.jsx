import { RequestList } from './RequestList';
import { RequestHeader } from './RequestsHeader';

export function RequestTable({ requests }) {
	return (
		<table className="flex flex-col mx-4">
			<thead className="border border-indigo-600 rounded-t-md bg-indigo-600">
				<tr className="flex items-center space-x-5 p-2 w-full">
					<RequestHeader />
				</tr>
			</thead>
			<tbody className="flex flex-col border-x border-b-[1px] rounded-b-md border-x-gray-100 border-b-gray-100">
				<RequestList requests={requests} />
			</tbody>
		</table>
	);
}

RequestTable.propTypes = {
	requests: RequestList.propTypes.requests,
};
