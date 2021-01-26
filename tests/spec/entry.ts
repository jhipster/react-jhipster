import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme';
import { configure } from 'enzyme';
import * as Adapter from '@wojtekmaj/enzyme-adapter-react-17';

/* eslint-disable */
// this one complains for some weird reason
// @ts-ignore
configure({ adapter: new Adapter() });
/* eslint-enable */

chai.use(chaiEnzyme());

(global as any).chai = chai;
(global as any).sinon = sinon;
(global as any).expect = chai.expect;
(global as any).should = chai.should();

const testsContext: any = require.context('./', true, /\.spec/);
testsContext.keys().forEach(testsContext);
