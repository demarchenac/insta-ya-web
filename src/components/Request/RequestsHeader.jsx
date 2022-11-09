const headers = [
	'# Servicio',
	'Fecha',
	'Ciudad de Entrega',
	'Dirección de Entrega',
	'Estado',
];

export function RequestHeader() {
	return (
		<>
			{headers.map((header) => (
				<th key={header} className="text-white text-sm font-bold flex-1">
					{header}
				</th>
			))}
		</>
	);
}
