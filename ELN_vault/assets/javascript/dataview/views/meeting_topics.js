if (input && dv) {
    
    if (input.index) {
        topic_index = input.index;
    } else {
        // Get all meeting topic containers
        const meetingTopicContainers = document.querySelectorAll('.meeting-topic');
        // Get the index of the last meeting topic container
        topic_index = meetingTopicContainers.length;
        // console.log('topic_index', topic_index);
    }

    const currentFile = dv.current().file;
    const fileCache = app.metadataCache.getFileCache(currentFile);

    var topics = fileCache.frontmatter.meeting.topics
    if (topics.length > topic_index) {
        let view = dv.container;
        const topicContainer = view.createDiv({cls: 'meeting-topic'});

        var time = fileCache.frontmatter.meeting.topics[topic_index].time;
        if (time !== null && time !== undefined) {
            const timeContainer = topicContainer.createDiv({
                cls: 'meeting-topic-time',
                text: time
            });
        }
        const topicTitle = fileCache.frontmatter.meeting.topics[topic_index].title;
        const titleContainer = topicContainer.createDiv({
            cls: 'meeting-topic-title',
            text: topicTitle
        });
        var contributor = fileCache.frontmatter.meeting.topics[topic_index].contributor;
        if ( contributor !== null && contributor !== undefined) {
            const contributorContainer = topicContainer.createDiv({
                cls: 'meeting-topic-contributor',
                text: contributor
            });
        }
    }
}