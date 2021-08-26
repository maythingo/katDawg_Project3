const { Tech, Matchup } = require('../models');

const resolvers = {
  Query: {
    tech: async () => {
      return Tech.find({});
      console.log(Tech)
    },
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
    addUser: async (parent, {username, email, password}) => {
      //do db stuff
      console.log(username, email, password)
      //once good return user obj
    }
  },
};

module.exports = resolvers;
