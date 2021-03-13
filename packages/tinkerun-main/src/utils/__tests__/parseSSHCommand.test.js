const {parseSSHCommand} = require('../parseSSHCommand')

describe.each([
  [
    {
      ssh_server: '192.168.1.1',
      ssh_user: 'root',
    },

    'ssh root@192.168.1.1',
  ],

  [
    {
      ssh_server: '192.168.1.1',
      ssh_user: 'root',
      ssh_port: '2000',
    },

    'ssh -p2000 root@192.168.1.1',
  ],

  [
    {
      ssh_server: '192.168.1.1',
      ssh_user: 'root',
      ssh_port: '2000',
      ssh_key: '/usr/local/id.pem',
    },

    'ssh -p2000 -i/usr/local/id.pem root@192.168.1.1',
  ],

  [
    {
      path: '/var/www/html',
      ssh_server: '192.168.1.1',
      ssh_user: 'root',
      ssh_port: '2000',
      ssh_key: '/usr/local/id.pem',
    },

    'ssh -p2000 -i/usr/local/id.pem root@192.168.1.1 -t \'cd /var/www/html;bash --login\'',
  ],
])('test parseSSHCommand(%o)', (connection, expected) => {
  it(`should return ${expected}`, () => {
    expect(parseSSHCommand(connection)).toBe(expected)
  })
})
