const padding = '8px';
const margin = '8px';
var a = `
    .theme--yellow-gray .k-column {
        background-color: #ddc;
    }

    .theme--yellow-gray .k-card {
        background-color:#eed;
    }
    .theme--yellow-gray .k-card--title {
      background-color: #444;
      color: #eed;
    }

    .theme--yellow-gray body {
      font-family: 'Open Sans', sans-serif;
      background-color: #eed;
      color: #444;
    }
`;

const _K_BOARD__CANVAS = { display: 'flex' };
const _K_BOARD = {
  'overflow-y': 'hidden', 'overflow-x': 'auto', 'width': '100%', 'height': '100vh', 'display': 'flex'
};

function KBoard({
  labels=[], labelComponent, keyField='kanban', showDynamicLabels, cards=[],
  cardComponent=KCard, preprocessCardProps=_.indentity, onColumnChange=_.noop
}) {
  const candidateLabels = showDynamicLabels ? [..._.map(cards, keyField), ...labels]: labels;
  const columnSpecs = _.uniqBy(candidateLabels.map(labelCandidate => _.assign({},
    _.isObject(labelCandidate) ? labelCandidate : { title: labelCandidate, value: labelCandidate }
  ))).map(columnSpec => _.assign(columnSpec, {
    cards: _.filter(cards, { [keyField]: columnSpec.value });
  }));

  return (
    <div className='k-board' style={ _K_BOARD } >
      <div className='k-board--canvas' style={ _K_BOARD__CANVAS }>
        { columnSpecs.map( ({ cards, ...columnSpec }) => (
          <KColumn {...columnSpec} { ...{ labelComponent } } >
            { _.filter(cards, { [keyField]: columnSpec.value }).map(card => (
              <cardComponent { ...preprocessCardProps(card) } />
            )) }
          </KColumn>
        )) }
      </div>
    </div>
  );
}

const _K_COLUMN__TITLE = { 'margin': '0', padding };

function KLabelComponent({ title }) {
  return <div className='k-column--title' style={ _K_COLUMN__TITLE }>{ title }</div>;
};

const _K_COLUMN = { 'width': '320px', 'display': 'inline-block', margin };
const _K_COLUMN__BODY = { margin };

function KColumn({ labelComponent=KLabelComponent, children, ...label }) {
  return (
    <div className='k-column' style={ _K_COLUMN } >
      <labelComponent { ...label } />
      <div className='k-column--body' style={ _K_COLUMN__BODY } >
        { children }
      </div>
    </div>
  );
}

const _K_CARD = { 'margin': `${margin} 0` };
const _K_CARD__TITLE = { padding };
const _K_CARD__DESCRIPTION = { padding };

function KCard({ title, description, ...card}) {
  return (
    <div className="k-card" style={ _K_CARD } >
      <div className="k-card--title" style={ _K_CARD__TITLE }>{ title }</div>
      <div className="k-card--description" style={ _K_CARD__DESCRIPTION }>{ description }</div>
        { _.map(card, (value, key) => {
          return <div><span>{ key }</span>{ ':' }<span>{ value }</span></div>
        }) }
    </div>
  );
}

const store = { dispatch: _.noop };
const ItemActions = { update: _.noop };
const keyField = 'status';

function updateColumn({ value }, { id }) {
  store.dispach(ItemActions.update(id, { [status]: value }));
}

export default function() {
  return (<KBoard showDynamicLabels cards={[]} onColumnChange={ updateColumn } keyField={ keyField } />);
}

