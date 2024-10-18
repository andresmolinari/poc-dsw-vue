import { reactive } from "vue";

export const store = reactive({
  params: {
    total: 0,
    tip: 0,
    people: 0,
    remaining: 0,
  },

  people: [],
});

export function getGrandTotal() {
  return store.params.total * (1 + store.params.tip / 100);
}

export function calculate() {
  store.people = [];
  const total = store.params.total;
  const tip = store.params.tip;
  const people = store.params.people;
  const totalPerPerson = getGrandTotal() / people;

  store.params.remaining = getGrandTotal();

  for (let i = 0; i < people; i++) {
    store.people.push({
      id: crypto.randomUUID(),
      numberOfPerson: i + 1,
      totalPerPerson,
      paid: false,
    });
  }

  calculateRemaining();
}

function calculateRemaining() {
  const missingToPay = store.people.filter((person) => !person.paid);
  const remaining = missingToPay.reduce(
    (acc, person) => (acc += person.totalPerPerson),
    0
  );

  store.params.remaining = remaining;
}

export function pay(id, paid) {
  const person = store.people.find((person) => person.id === id);
  if (person) {
    person.paid = paid;
    calculateRemaining();
  }
}
