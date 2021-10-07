import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'web-streams-polyfill';

Enzyme.configure({ adapter: new Adapter() });
