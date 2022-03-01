const { formatCmdline } = require('./parser');

describe('formatCmdline', () => {
	it('should create arguments from map keys', () => {
		const expected = ['-machine', 'q35'];
		expect(
			formatCmdline({machine: 'q35'})
		).toEqual(expect.arrayContaining(expected));
	});

	it('should create valueless arguments from keys with null value', () => {
		const expected = ['-nographic', '-enable-kvm'];
		expect(
			formatCmdline({
				'machine': 'q35',
				'nographic': null,
				'm': '512M',
				'enable-kvm': null,

			})
		).toEqual(expect.arrayContaining(expected));
	});

	it('should accept sequences for non-unique arguments', () => {
		const expected = [
			'-drive', 'if=pflash,format=raw,unit=0,file=/usr/share/OVMF/OVMF_CODE.fd',
			'-drive', 'if=virtio,format=qcow2,file=/data/guest0.qcow2,index=0,media=disk',
		];

		expect(formatCmdline({
			drive: [
				{
					'if': 'pflash',
					'format': 'raw',
					'unit': 0,
					'file': '/usr/share/OVMF/OVMF_CODE.fd',
				},
				{
					'if': 'virtio',
					'format': 'qcow2',
					'file': '/data/guest0.qcow2',
					'index': 0,
					'media': 'disk'
				},
			]
		})).toEqual(expect.arrayContaining(expected));
	});

	it('should accept arguments with inline properties', () => {
		const expected = ['-chardev', 'null,id=id'];
		expect(formatCmdline({
			'chardev': 'null,id=id'
		})).toEqual(expect.arrayContaining(expected));
	});
});