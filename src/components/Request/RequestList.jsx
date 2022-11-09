import PropTypes from 'prop-types';

import { RequestItem } from './RequestItem';

export function RequestList({ requests }) {
	return (
		<>
			{requests.map((request, index) => {
				return (
					<RequestItem
						key={request._id}
						request={request}
						isEven={(index + 1) % 2 === 0}
					/>
				);
			})}
		</>
	);
}

RequestList.propTypes = {
	requests: PropTypes.arrayOf(RequestItem.propTypes.request).isRequired,
};
