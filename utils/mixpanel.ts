import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.NEXT_MIXPANEL_PROJECT_KEY);

const env_check: any = process.env.NODE_ENV === "development";

if (env_check) {
  mixpanel.identify = (id: any) => {
    console.log("mixpanel identify", id);
  };

  mixpanel.alias = (id: any) => {
    console.log("mixpanel alias", id);
  };

  mixpanel.track = (name: any, props: any) => {
    console.log("mixpanel track", name, props);
  };

  mixpanel.people = {
    ...mixpanel.people,
    set: (props: any) => {
      console.log("mixpanel people", props);
    },
  };
}

const actions = {
  identify: (id: any) => {
    mixpanel.identify(id);
  },
  alias: (id: any) => {
    mixpanel.alias(id);
  },
  track: (name: any, props: any) => {
    mixpanel.track(name, props);
  },
  people: {
    set: (props: any) => {
      mixpanel.people.set(props);
    },
  },
};

export { actions as mixpanel };
