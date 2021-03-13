import { transformAndValidate } from 'class-transformer-validator';
import { IsString, IsBoolean } from 'class-validator';
import { IncompatibleWith } from './index';

class UpdateUserDTO {
  @IsString()
  @IncompatibleWith(['deleted'])
  readonly status: string;

  @IsBoolean()
  @IncompatibleWith(['status'])
  readonly deleted: boolean;

  @IsString()
  readonly name: string;
}

describe('IncompatibleWith decorator', () => {
  it('throws if sibling is defined in the object', async () => {
    const obj = {
      status: 'test',
      deleted: true,
      name: 'john',
    };

    await expect(transformAndValidate(UpdateUserDTO, obj)).rejects.toEqual([
      {
        children: [],
        constraints: {
          IsNotSiblingOfConstraint:
            'status cannot exist alongside the following defined properties: deleted',
        },
        property: 'status',
        target: { deleted: true, name: 'john', status: 'test' },
        value: 'test',
      },
      {
        children: [],
        constraints: {
          IsNotSiblingOfConstraint:
            'deleted cannot exist alongside the following defined properties: status',
        },
        property: 'deleted',
        target: { deleted: true, name: 'john', status: 'test' },
        value: true,
      },
    ]);
  });

  it('returns the class if one of keys exist on the object', async () => {
    const objWithoutStatus = {
      deleted: true,
      name: 'john',
    };

    let result = await transformAndValidate(UpdateUserDTO, objWithoutStatus);
    expect(result).toEqual(objWithoutStatus);
    expect(result).toBeInstanceOf(UpdateUserDTO);

    const objWithoutDeleted = {
      status: 'test',
      name: 'john',
    };

    result = await transformAndValidate(UpdateUserDTO, objWithoutDeleted);
    expect(result).toEqual(objWithoutDeleted);
    expect(result).toBeInstanceOf(UpdateUserDTO);
  });
});
