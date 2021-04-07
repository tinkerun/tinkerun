import {minifyPHPCode} from '../minifyPHPCode'

describe.each([
  [
    `
    // single line
//////single line
# single line
##### single line

echo 3+/*inline*/2+3//some comment

/*
This is a multiple-lines comment block
that spans over multiple
lines
*/
    `,
    'echo 3+2+3',
  ],
  [
    `
    StmasSocks::where('stkcod', 'LIKE', '%B01%')
    ->get();
    `,
    'StmasSocks::where(\'stkcod\', \'LIKE\', \'%B01%\') ->get();',
  ],
  [
    `// lots of blank line
    
    
    
    
    
    
    User::first()
    
    
    
    
    
    
    `,
    'User::first()',
  ],
  [
    `
    DB::connection("socks")
->select("
SELECT COUNT(*)
FROM stcrd
WHERE ( docnum LIKE 'IV%' OR docnum LIKE 'HS%' )
AND docdat BETWEEN '2017-01-01' AND '2018-01-01'
");
    `,
    'DB::connection("socks") ->select(" SELECT COUNT(*) FROM stcrd WHERE ( docnum LIKE \'IV%\' OR docnum LIKE \'HS%\' ) AND docdat BETWEEN \'2017-01-01\' AND \'2018-01-01\' ");',
  ],
])('test minifyPHPCode(%s)', (code, expected) => {
  it(`should be ${expected}`, () => {
    expect(minifyPHPCode(code)).toBe(expected)
  })
})
